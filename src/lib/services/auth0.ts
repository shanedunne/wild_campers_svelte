// src/lib/services/auth0-service.ts
import { createAuth0Client, type Auth0Client, type RedirectLoginOptions, type LogoutOptions, type GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';
import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import type { User } from '$lib/types/app-types';
import { appServices } from './app-services';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0ApiAudience = import.meta.env.VITE_AUTH0_API_AUDIENCE;
const appBaseUrl = import.meta.env.VITE_APP_BASE_URL || (browser ? window.location.origin : '');


export const isAuthenticated = writable(false);
export const auth0Profile = writable<any | null | undefined>(null);
export const user = writable<User | null>(null);
export const authError = writable<Error | null>(null);
export const isLoading = writable(true);

export const currentSession = derived(
	[isAuthenticated, isLoading, auth0Profile, user, authError],
	([$isAuth, $loading, $profile, $user, $error]) => ({
		isAuthenticated: $isAuth,
		isLoading:       $loading,
		auth0Profile:    $profile,
		user:            $user,
		error:           $error
	})
);

export let client: Auth0Client | null = null;


export async function getClient(): Promise<Auth0Client> {
  if (client) return client;

  if (!auth0Domain || !auth0ClientId) {
    const errorMsg = "Auth0 domain or client ID is not configured. Check .env variables.";
    console.error(errorMsg);
    authError.set(new Error(errorMsg));
    throw new Error(errorMsg);
  }

  client = await createAuth0Client({
    domain: auth0Domain,
    clientId: auth0ClientId,
    authorizationParams: {
      redirect_uri: `${appBaseUrl}/callback`,
      audience: auth0ApiAudience,

    },
    cacheLocation: 'localstorage',
  });
  return client;
}

export async function getUser() {
    const c = await getClient();
    const profile = await c.getUser();

    if (!profile) throw new Error("Auth0 profile not loaded yet");
  return profile;
  }
  

export async function initializeAuth(): Promise<void> {
  if (!browser) return;
  isLoading.set(true);
  authError.set(null);

  try {
    const authClient = await getClient();
    const params = new URLSearchParams(window.location.search);

    if (params.has('code') && params.has('state')) {
      await authClient.handleRedirectCallback();
      window.history.replaceState({}, document.title, '/');
    }

    const authed = await authClient.isAuthenticated();
    isAuthenticated.set(authed);
    if (authed) {
      const userProfile = await authClient.getUser();
      auth0Profile.set(userProfile ?? null);

      const sessionUser: User = {
        auth0Id: userProfile?.sub ?? "",
        email: userProfile?.email ?? "",
        role: userProfile?.role ?? "USER"
      }

      user.set(sessionUser);

      const syncSession = await appServices.syncUserProfile();
      if (!syncSession){
        console.error("failed to sync to backend")
      }
      appServices.syncUserProfile();
    }
  } catch (e: any) {
    console.error('Error initializing Auth0:', e);
    authError.set(e);
    isAuthenticated.set(false);
    user.set(null);
  } finally {
    isLoading.set(false);
  }
}

export async function loginWithRedirect(options?: RedirectLoginOptions): Promise<void> {
  const authClient = await getClient();
  await authClient.loginWithRedirect(options);
}

export async function logout(options?: LogoutOptions): Promise<void> {
  const authClient = await getClient();
  await authClient.logout({
    logoutParams: {
      returnTo: appBaseUrl,
      ...options?.logoutParams,
    }
  });
  isAuthenticated.set(false);
  user.set(null);
  auth0Profile.set(null);
}

export async function getAccessTokenSilently(options?: GetTokenSilentlyOptions): Promise<string | undefined> {
  try {
    const authClient = await getClient();
    const token = await authClient.getTokenSilently({
        authorizationParams: {
            audience: 'https://api.wildcampers.com',
            scope: "openid profile email"
        },
        ...options
    });
    return token;
  } catch (e: any) {
    console.error('Error getting access token silently:', e);
    authError.set(e);
    return undefined;
  }
}

if (browser) {
  initializeAuth();
}
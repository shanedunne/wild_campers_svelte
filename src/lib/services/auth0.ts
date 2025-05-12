// src/lib/services/auth0-service.ts
import { createAuth0Client, type Auth0Client, type RedirectLoginOptions, type LogoutOptions, type GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';
import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0ApiAudience = import.meta.env.VITE_AUTH0_API_AUDIENCE;
const appBaseUrl = import.meta.env.VITE_APP_BASE_URL || (browser ? window.location.origin : '');

export let client: Auth0Client | null = null;

export const isAuthenticated: Writable<boolean> = writable(false);
export const user: Writable<any | null> = writable(null);
export const authError: Writable<Error | null> = writable(null);
export const isLoading: Writable<boolean> = writable(true);

async function getClient(): Promise<Auth0Client> {
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
      user.set(userProfile || null);
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
}

export async function getAccessTokenSilently(options?: GetTokenSilentlyOptions): Promise<string | undefined> {
  try {
    const authClient = await getClient();
    const token = await authClient.getTokenSilently({
        authorizationParams: {
            audience: auth0ApiAudience,
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
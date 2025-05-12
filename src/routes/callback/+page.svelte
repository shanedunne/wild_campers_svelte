<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { isAuthenticated, user, authError, isLoading, initializeAuth, client } from '$lib/services/auth0';
    import { browser } from '$app/environment';
  
    onMount(async () => {

      const unsubscribeLoading = isLoading.subscribe(loading => {
        if (!loading && browser) {
          unsubscribeLoading();
          if ($isAuthenticated && $user) {
            goto('/dashboard');
          } else if ($authError) {
            console.error("Login callback error:", $authError);
            goto('/login-failed');
          } else {
            console.warn("Callback handled, but not authenticated or no user. Redirecting to home.");
            goto('/');
          }
        }
      });

      if (!$isLoading && browser && !client) {
           await initializeAuth();
      }
    });
  </script>
  
  <div class="container text-center py-5">
    {#if $isLoading}
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Processing login...</span>
      </div>
      <p class="mt-3">Please wait, we're securely logging you in...</p>
    {:else if $authError}
      <div class="alert alert-danger">
        <h4 class="alert-heading">Login Error</h4>
        <p>There was an issue logging you in: {$authError.message}</p>
        <p><a href="/" class="btn btn-link">Try going to the homepage</a> or <button on:click={() => import('$lib/services/auth0').then(auth => auth.loginWithRedirect())} class="btn btn-primary">Try Logging In Again</button></p>
      </div>
    {:else}
      <p>Redirecting...</p>
    {/if}
  </div>
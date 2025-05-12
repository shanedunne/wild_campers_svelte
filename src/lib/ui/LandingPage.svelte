<script lang="ts">
  import {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    isLoading,
  } from "$lib/services/auth0";
</script>

<section class="section">
  <div class="container text-center my-5">
    <div class="info">
      <img
        src="/images/home.jpg"
        alt="mountain camping"
        class="img-fluid mb-4"
        style="max-height: 400px;"
      />
      <h1>Welcome to Wild Campers</h1>
      <p class="lead">Sign up or Log in to start your adventure...</p>
    </div>
    <div class="login">
      {#if $isLoading}
        <span>Loading</span>
      {:else if $isAuthenticated}
        <span>Welcome {$user?.name} || {$user?.email}!</span>
        <button class="btn login-button" onclick={() => logout}>Logout</button>
      {:else}
        <button class="btn login-button" onclick={() => loginWithRedirect()}
          >Log In</button
        >
      {/if}
    </div>
  </div>
</section>

<style>
  .signup-button {
    background-color: #606c38;
    color: #fefae0;
    transition: color 0.3s;
  }

  .signup-button:hover {
    background-color: #283618;
    color: #fefae0;
  }

  .login-button {
    background-color: #283618;
    color: #fefae0;
    transition: color 0.3s;
  }

  .login-button:hover {
    background-color: #606c38;
    color: #fefae0;
  }
</style>

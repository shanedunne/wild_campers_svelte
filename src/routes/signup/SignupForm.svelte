<script lang="ts">
    import { goto } from "$app/navigation";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
    import UserDetails from "$lib/ui/UserDetails.svelte";
  
    let firstName = $state("");
    let lastName = $state("");
    let email = $state("");
    let password = $state("");
    let message = $state("");
    
  
    async function signup() {
      const success = false;
      if (success) {
        goto("/dashboard");
      } else {
        message = "Error Trying to sign up";
      }
    }
  </script>
  
  <section class="d-flex flex-column align-items-center justify-content-center py-5">
    <UserDetails bind:firstName bind:lastName />
    <UserCredentials bind:email bind:password />
    <button onclick={() => signup()} class="signup-button btn">Sign Up</button>
    <p class="text-center">
      Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
    </p>
  </section>
  
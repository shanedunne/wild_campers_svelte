<script lang="ts">
    import { goto } from "$app/navigation";
    import Message from "$lib/ui/Message.svelte";
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
  
    let email = $state("");
    let password = $state("");
    let message = $state("");
  
    async function login() {
      const success = false;
      if (success) {
        goto("/dashboard");
      } else {
        message = "Error Trying to login";
      }
    }
  </script>
  
  <div>
    {#if message}
      <Message {message} />
    {/if}
    <UserCredentials bind:email bind:password />
    <button onclick={() => login()} class="login-button btn">Log In</button>
  </div>
  
  <style>
    .login-button {
      align-items: center;
    background-color: #283618;
    color: #fefae0;
    transition: color 0.3s;
    /* temporary solution*/
    margin-left: 30px;
  }
  
  .login-button:hover {
    background-color: #606c38;
    color: #fefae0;
  }
  </style>
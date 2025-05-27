<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { appServices } from "$lib/services/app-services";

  let message = $state("");

  
</script>

<div>
  {#if message}
    <Message {message} />
  {/if}
  <form method="POST" action="?/login">
    <UserCredentials  />
  <button class="login-button btn">Log In</button>
  </form>
  
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

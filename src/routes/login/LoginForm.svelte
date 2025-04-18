<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { loggedInUser } from "$lib/runes.svelte";
  import { appServices } from "$lib/services/app-services";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    console.log(`attempting to log in email: ${email} with password ${password}`)
    let session = await appServices.login(email, password);
    if (session) {
      loggedInUser.email = email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
      console.log(`Sesstion: ${JSON.stringify(session)}`);
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
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

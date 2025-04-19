<script lang="ts">
  import Menu from "$lib/ui/Menu.svelte";
  import { browser } from "$app/environment";
  import { loggedInUser } from "$lib/runes.svelte";

  if (browser) {
    const savedLoggedInUser = localStorage.wildCampers;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;

    }
  }
</script>

<div class="body-div">
  <Menu />
  <slot />
</div>

<style>
  
  .body-div {
    padding: 0;
    width: auto;
    min-height: 100vh;
    background-color: #fefae0;
    font-family: "Fauna One", serif;
    font-weight: 400;
    font-style: normal;
  }
</style>

<script lang="ts">
  import Menu from "$lib/ui/Menu.svelte";
  import { loggedInUser } from "$lib/runes.svelte";

  export let data: any;
  if (data.session) {
    loggedInUser.email = data.session.email;
    loggedInUser.name = data.session.name;
    loggedInUser.token = data.session.token;
    loggedInUser._id = data.session._id;
  } else {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
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

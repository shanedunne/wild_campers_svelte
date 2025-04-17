<script lang="ts">
  import Menu from "$lib/ui/Menu.svelte";
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

<script lang="ts">
  import LocationCard from "$lib/ui/LocationCard.svelte";
  import type { Location } from "$lib/types/app-types";

  export let locationList: Location[] = [];
</script>

<div class="container my-4">
  <div class="container my-4 locations-container-card">
    <div class="row justify-content-center">
      {#each locationList as location}
        <LocationCard
          {location}
        />
      {/each}
    </div>
  </div>
</div>

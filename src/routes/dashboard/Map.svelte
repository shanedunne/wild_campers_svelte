<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { appServices } from "$lib/services/app-services";
  import type { Location } from "$lib/types/app-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  
  let map: LeafletMap;

  onMount(async () => {
    const locations = await appServices.getLocations(loggedInUser.token);
    locations.forEach((location: Location) => {
      map.addMarker(parseFloat(location.latitude), parseFloat(location.longitude), location.name);
    });
  });
</script>

<LeafletMap height={60} bind:this={map} />

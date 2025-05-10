<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { createEventDispatcher } from 'svelte';
  import { appServices } from "$lib/services/app-services";
  import type { Location } from "$lib/types/app-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";

  export let locations: Location[] = [];

  let map: LeafletMap;

 

  onMount(async () => {

    // adds all locations to the map
    const locations = await appServices.getLocations(loggedInUser.token);
    locations.forEach((location: Location) => {
      map.addMarker(
        parseFloat(location.latitude),
        parseFloat(location.longitude),
        location.name,
        location.locationImages[0],
        location._id
      );
    });

    // centers map on last location
    const lastLocation = locations[locations.length - 1];
    if (lastLocation)
      map.moveTo(
        parseFloat(lastLocation.latitude),
        parseFloat(lastLocation.longitude)
      );
  });
</script>

<LeafletMap  bind:this={map}  />


<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { createEventDispatcher } from "svelte";
  import { appServices } from "$lib/services/app-services";
  import type { Location } from "$lib/types/app-types";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let map: LeafletMap;

  let location: Location;
  let loading = true;
  let errorMessage = "";

  // use location id to
  onMount(async () => {
    try {
      const id = $page.params.id;
      const token = loggedInUser.token;
      location = await appServices.getLocation(id, token);
      console.log(location);
      loading = false;
    } catch (error) {
      console.error(error);
      errorMessage = "error getting location data";
    }

    map.addMarker(
      parseFloat(location.latitude),
      parseFloat(location.longitude),
      location.name,
      location.locationImages[0],
      location._id
    );

    map.moveTo(
        parseFloat(location.latitude),
        parseFloat(location.longitude)
      );
  });

 
</script>

<LeafletMap bind:this={map} />

<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";
  import { page } from "$app/stores";
  import LocationMap from "./LocationMap.svelte";
  import LocationCard from "$lib/ui/LocationCard.svelte";
  import Ammenities from "$lib/ui/Ammenities.svelte";

  // declare location type with default values
  let location: Location | null = null;
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
  });

  
</script>

{#if loading}
  <div class="d-flex justify-content-center py-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading…</span>
    </div>
  </div>
{:else if errorMessage}
  <!-- Error alert -->
  <div class="container py-5">
    <div class="alert alert-danger" role="alert">{errorMessage}</div>
  </div>
{:else if location}
  <section class="section">
    <div class="d-flex justify-content-center" style="min-height: 90vh;">
      <div class="container">
        <div class="text-center my-4">
          <!--<img src={location.img} class="location-image img-fluid">-->
        </div>
        <div class="location-container">
          <div class="location-name my-5">
            <h2>
              {location.name}
            </h2>
            <p class="coordinates">
              <small class="text-muted">
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </small>
            </p>
            <p class="category">
              <small><strong>{location.categoryId}</strong></small>
            </p>
          </div>
          <div class="location-map">
            <LocationMap />
          </div>
          <Ammenities {location} />
          <p>
            {location.locationDescription}
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}


<style>
 

 :root {
    --map-height: 45vh;
  }

  .location-map {
    height: 50vh;
    position: static;
    top: 0;
  }

  @media (min-width: 992px) {
    .location-map {
      position: sticky;
    }

  }
</style>

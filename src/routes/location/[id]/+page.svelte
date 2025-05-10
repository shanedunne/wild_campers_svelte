<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";
  import { page } from "$app/stores";
  import LocationMap from "./LocationMap.svelte";
  import Card from "$lib/ui/Card.svelte";
  import Ammenities from "$lib/ui/Ammenities.svelte";
  import ImageCarousel from "$lib/ui/ImageCarousel.svelte";

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
  <div class="container-fluid location-detail-page my-4">
    <header class="text-center mb-4 pt-3">
      <h1 class="display-5 fw-bold">{location.name}</h1>
      <p class="lead text-muted">
        <i class="bi bi-tag-fill me-1"></i>Category: {location.categoryId ||
          "N/A"}
        <span class="mx-2">|</span>
        <i class="bi bi-geo-alt-fill me-1"></i>Lat: {parseFloat(
          location.latitude
        ).toFixed(4)}, Lng: {parseFloat(location.longitude).toFixed(4)}
      </p>
    </header>

    <div class="row g-lg-5 g-md-4 g-3">
      <div class="col-lg-5 col-md-12 order-lg-1 order-md-2">
        <section class="mb-4 map-container shadow-sm rounded">
          {#if location.latitude && location.longitude}
            <LocationMap bind:location />
          {:else}
            <div class="alert alert-warning">
              Map coordinates not available.
            </div>
          {/if}
        </section>

        <Card title="Local Weather">
          <p class="text-muted fst-italic">Weather information coming soon!</p>
        </Card>
      </div>

      <div class="col-lg-7 col-md-12 order-lg-2 order-md-1">
        <section
          class="mb-4 image-carousel-container shadow-sm rounded overflow-hidden"
        >
          {#if location.locationImages && location.locationImages.length > 0}
            <ImageCarousel bind:location />
          {:else}
            <img
              src="/images/camping.jpg"
              alt="Default placeholder for {location.name}"
              class="img-fluid default-location-image"
            />
          {/if}
        </section>

        <Card title="Desciption">
          <p class="card-text" style="white-space: pre-wrap;">
            {location.locationDescription}
          </p>
        </Card>

        <Card title="Amenities">
          <Ammenities bind:location />
        </Card>
      </div>
    </div>
  </div>
{:else}
  <div class="container py-5 text-center">
    <div class="alert alert-info" role="alert">Location data not found.</div>
  </div>
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
  }
</style>

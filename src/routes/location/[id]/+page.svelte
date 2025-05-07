<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";
  import { page } from "$app/stores";

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

  const ammenityIcon = (value: boolean, faIcon: string, label: string) => {
    const colour = value ? "success" : "secondary";

    return `
			<span class="badge bg-${colour} d-flex align-items-center gap-1 px-3 py-2 w-100">
				<i class="fas fa-${faIcon}"></i>
				<span>${label}</span>
			</span>
		`;
  };
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
          <div class="location-content">
            <p>
              {location.locationDescription}
            </p>
            <ul class="list-unstyled row gy-2 amenities">
              <li class="col-6 col-md-4">
                {@html ammenityIcon(
                  location.accessibleByVehicle,
                  "car",
                  "Vehicle Access"
                )}
              </li>
              <li class="col-6 col-md-4">
                {@html ammenityIcon(location.petFriendly, "paw", "Pet Friendly")}
              </li>
              <li class="col-6 col-md-4">
                {@html ammenityIcon(location.swimming, "swimmer", "Swimming")}
              </li>
              <li class="col-6 col-md-4">
                {@html ammenityIcon(location.hiking, "hiking", "Hiking")}
              </li>
              <li class="col-6 col-md-4">
                {@html ammenityIcon(
                  location.closeToTown,
                  "city",
                  "Close to Town"
                )}
              </li>
              <li class="col-6 col-md-4">
                {@html ammenityIcon(
                  location.greatViews,
                  "binoculars",
                  "Great Views"
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}


<style>
  
</style>
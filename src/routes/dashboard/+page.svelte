<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
import DashboardCard from "$lib/ui/DashboardCard.svelte"; 
import LocationForm from "../add-location/LocationForm.svelte";
  import ListLocations from "./ListLocations.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";
  import DashboardMap from "./DashboardMap.svelte";
  import { refreshLocationMap } from "$lib/services/location-utils";
  import { goto } from "$app/navigation";

function goToAddLocation() {
  goto("/add-location");
}


  let categoryList: Category[] = [];
  let locationList: Location[] = [];

  let map: DashboardMap;

  async function locationAdded(location: Location) {
    locationList = [...locationList, location];

    // map.addMarker(parseFloat(location.latitude), parseFloat(location.longitude), location.name);
    // map.moveTo(parseFloat(location.latitude), parseFloat(location.longitude));
  }

  onMount(async () => {
    categoryList = await appServices.getCategories(loggedInUser.token);
    locationList = await appServices.getLocations(loggedInUser.token);
  });
</script>

<div class="dashboard container-fluid">
    <div class="row mb-4 align-items-center mt-4">
      <div class="col-md-8">
        <h3 class="display-5 fw-bold">Discover Your Next Adventure</h3>
        <p class="lead text-muted">
          Explore the best wild camping sites and hidden gems shared by our community.
        </p>
      </div>
      <div class="col-md-4 text-md-end mt-3 mt-md-0">
        <button class="btn new-location-button" on:click={goToAddLocation}>
          <i class="bi bi-plus-circle-fill me-2"></i>Add New Location
        </button>
      </div>
  </div>
  <div class="row">
    <div class="col-12 col-lg-5 order-1 order-lg-1 map-column">
        <DashboardMap />
    </div>
    <div class="col-12 col-lg-7 order-2 order-lg-2 list-column">
      <DashboardCard title="Top Locations">
        <ListLocations {locationList} />
      </DashboardCard>
    </div>
  </div>


    
</div>

<style>
  .dashboard {
    padding-left: 1em;
    padding-right: 1em;
  }

  .map-column {
    height: 50vh;
    position: static;
    top: 0;
  }

  .new-location-button {
    align-items: center;
    background-color: #283618;
    color: #fefae0;
    transition: color 0.3s;
    bottom: 0;
  }

  .new-location-button {
    background-color: #606c38;
    color: #fefae0;
  }

  @media (min-width: 992px) {
    .map-column {
      position: sticky;
      height: 100vh !important;
    }
    :root {
    --map-height: 80vh;
  }

    .list-column {
      height: 100vh;
      overflow-y: auto;
      padding-inline: 1rem;
    }
    .dashboard {
      height: 100vh;
      padding-left: 3em;
      padding-right: 3em;
    }
  }
</style>

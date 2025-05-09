<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LocationForm from "./LocationForm.svelte";
  import ListLocations from "./ListLocations.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";
  import DashboardMap from "./DashboardMap.svelte";
  import { refreshLocationMap } from "$lib/services/location-utils";

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
  <div class="row">
    <div class="col-12 col-lg-5 order-1 order-lg-1 map-column">
      <Card>
        <DashboardMap />
      </Card>
    </div>
    <div class="col-12 col-lg-7 order-2 order-lg-2 list-column">
      <Card title="Saved Locations">
        <ListLocations {locationList} />
      </Card>
    </div>
  </div>

  <!--
        
    <div class="row">
      <div class="col">
        <Card title="Add A Location">
          <LocationForm {categoryList} locationEvent={locationAdded} />
        </Card>
      </div>
    </div>

      -->
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

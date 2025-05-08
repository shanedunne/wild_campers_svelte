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

  async function locationAdded(location:Location) {
    locationList = [...locationList, location];

    // map.addMarker(parseFloat(location.latitude), parseFloat(location.longitude), location.name);
    // map.moveTo(parseFloat(location.latitude), parseFloat(location.longitude));


  }

  onMount(async () => {
    categoryList = await appServices.getCategories(loggedInUser.token);
    locationList = await appServices.getLocations(loggedInUser.token);


  });

  

</script>
<div class="dashboard d-lg-flex">
    <div class="map-column flex-shrink-0 pt-5">
      <Card>
        <DashboardMap />
</Card>
    </div>
    <div class="flex-grow-1 overflow-auto p-3">
      <Card title="Saved Locations">
        
        <ListLocations {locationList} />
      </Card>
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
	/* root flex container */
	.dashboard{height:100vh;
  padding-left: 3em;
  padding-right: 3em;
  }

	
	.map-column{
		position:sticky;
		top:0; left:0;
		width:100%;
		height:50vh;
	}

	@media (min-width:992px){ 
		.map-column{
			width:50vw;
			height:100vh;
		}
	}
</style>
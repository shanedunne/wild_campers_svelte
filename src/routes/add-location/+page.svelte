<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
import DashboardCard from "$lib/ui/DashboardCard.svelte"; 
import LocationForm from "./LocationForm.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";
  import { refreshLocationMap } from "$lib/services/location-utils";
  import { goto } from "$app/navigation";

function goToAddLocation() {
  goto("/add-location");
}


  let categoryList: Category[] = [];


 

  onMount(async () => {
    categoryList = await appServices.getCategories(loggedInUser.token);
  });
</script>

<div class="dashboard container-fluid">


  
        
    <div class="row">
      <div class="col">
        <DashboardCard title="Add A Location">
          <LocationForm {categoryList}  />
        </DashboardCard>
      </div>
    </div>

    
</div>

<style>
  .dashboard {
    padding-left: 1em;
    padding-right: 1em;
  }

  @media (min-width: 992px) {
    :root {
    --map-height: 80vh;
  }
    .dashboard {
      height: 100vh;
      padding-left: 3em;
      padding-right: 3em;
    }
  }
</style>

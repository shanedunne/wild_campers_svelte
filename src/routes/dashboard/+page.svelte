<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LocationForm from "./LocationForm.svelte";
  import ListLocations from "./ListLocations.svelte";
  import { onMount } from "svelte";
  import type { Category, Location } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";

  let categoryList: Category[] = [];
  let locationList: Location[] = [];

  onMount(async () => {
    categoryList = await appServices.getCategories(loggedInUser.token);
    locationList = await appServices.getLocations(loggedInUser.token);
  });
</script>

<Card title="Add A Location">
  <LocationForm {categoryList} />
</Card>
<Card title="Saved Locations">
  <ListLocations {locationList} />
</Card>

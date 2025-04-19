<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LocationForm from "./LocationForm.svelte";
  import ListLocations from "./ListLocations.svelte";
  import { onMount } from "svelte";
  import type { Category } from "$lib/types/app-types";
  import { appServices } from "$lib/services/app-services";

  let categoryList: Category[] = [];

  onMount(async () => {
    categoryList = await appServices.getCategories(loggedInUser.token);
  });
</script>

<Card title="Add A Location">
  <LocationForm {categoryList} />
</Card>
<Card title="Saved Locations">
  <ListLocations />
</Card>

<script lang="ts">
    import LocationCard from "$lib/ui/LocationCard.svelte";

    // Declare category type and get list as prop
  let { locationList = [] } = $props();
</script>

<div class="container my-4">
  <div class="container my-4 locations-container-card">
    <div class="row justify-content-center">
      {#each locationList as location}
        <LocationCard 
          locationName={location.name}
          latitude={location.latitude}
          longitude={location.longitude}
          _id={location._id}
        />
      {/each}
    </div>
  </div>
</div>
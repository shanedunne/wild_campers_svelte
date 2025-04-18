<script lang="ts">
    import LocationCard from "$lib/ui/LocationCard.svelte";
    import { locations } from "$lib/data/Locations";
</script>

<div class="container my-4">
  <div class="container my-4 locations-container-card">
    <div class="row justify-content-center">
      {#each locations as location}
        <LocationCard 
          locationName={location.locationName}
          latitude={location.lat}
          longitude={location.lng}
          _id=""
        />
      {/each}
    </div>
  </div>
</div>
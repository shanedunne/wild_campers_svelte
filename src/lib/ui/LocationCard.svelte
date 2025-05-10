<script lang="ts">
  import type { Location } from "$lib/types/app-types";
  export let location: Location;
</script>

<div class="location-card">
  <a class="text-reset text-decoration-none" href={`/location/${location._id}`}>
    <div
      class="card shadow-sm border-0 h-100 position-relative overflow-hidden"
    >
      <div class="row g-0">
        
          {#if location && location.locationImages.length > 0}
          <div class="col-4 image-container">
            <img
              src={location.locationImages[0]}
              alt={location.name}
              class="img-fluid rounded-start object-fit-cover h-100 w-100"
            />
         </div>
          {:else if location}
          <div class="col-4 image-container">
              <img
              src="images/camping.jpg"
              alt={location.name}
              class="img-fluid rounded-start object-fit-cover h-100 w-100"
            />
          </div>
          
          {/if}
        <div class="col-8">
          <div class="card-body p-3">
            <h5 class="card-title fw-bold mb-1">{location.name}</h5>
            <p class="text-muted mb-1 fw-bold">
              {location.categoryId}
            </p>

            <p class="text-muted mb-2 small fw-semibold">
              <i class="bi bi-compass me-1"></i>{location.latitude} / {location.longitude}
            </p>

            <p class="card-text text-secondary small mb-0">
              {location.locationDescription}
            </p>
          </div>

          <i
            class="bi bi-bookmark fs-5 position-absolute top-0 end-0 m-2 text-muted"
          ></i>
        </div>
      </div>
    </div>
  </a>
</div>

<style>
  .location-card:hover {
    border-color: #606c38;
    transform: translateY(-2px);
    transition: all 0.15s ease;
  }

  .card-body {
    background-color: #fcf5d8;
  }

  .location-card {
    padding: 0;
  }

  .image-container {
    height: 178px;
  }
</style>

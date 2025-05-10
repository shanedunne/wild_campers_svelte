<script lang="ts">
  import type { Location } from "$lib/types/app-types";
  export let location: Location;

  const carouselId = `locationImageCarousel_${location._id || Math.random().toString(36).substring(2)}`;
</script>

{#if location.locationImages && location.locationImages.length > 0}
  <div id={carouselId} class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
    {#if location.locationImages.length > 1}
      <div class="carousel-indicators">
        {#each location.locationImages as _, i}
          <button
            type="button"
            data-bs-target="#{carouselId}"
            data-bs-slide-to={i}
            class={i === 0 ? "active" : ""}
            aria-current={i === 0 ? "true" : "false"}
            aria-label="Slide {i + 1}"
          ></button>
        {/each}
      </div>
    {/if}
    <div class="carousel-inner">
      {#each location.locationImages as imgSrc, i}
        <div class="carousel-item {i === 0 ? 'active' : ''}">
          <img src={imgSrc} class="d-block w-100" alt="{location.name} - Image {i + 1}" style="max-height: 500px; object-fit: cover;" />
        </div>
      {/each}
    </div>
    {#if location.locationImages.length > 1}
      <button class="carousel-control-prev" type="button" data-bs-target="#{carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#{carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    {/if}
  </div>
{:else}
  <img src="/images/camping.jpg" alt="Default placeholder for {location.name}" class="img-fluid default-location-image" />
{/if}

<style>
  .carousel-item img {

    height: 450px;
    object-fit: cover;
  }
  .default-location-image {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 0.375rem; /* Match card rounding */
  }

  @media (max-width: 992px) {
    .carousel-item img {

height: 350px;
object-fit: cover;
}
  }
</style>
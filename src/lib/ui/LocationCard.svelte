<script lang="ts">
  export let locationName: string;
  export let latitude: number = 0;
  export let longitude: number = 0;
  export let _id: string = "";
</script>

<div class="col-md-5 mb-4">
  <div class="card location-card shadow-sm">
    <div class="card-body">
      <a class="location-open" href={`/location/${_id}`}>
        <h5 class="card-title">{locationName}</h5>
      </a>
      <p class="card-text">
        <small class="text-muted">
          Latitude: {latitude}, Longitude: {longitude}
        </small>
      </p>
    </div>
  </div>
</div>

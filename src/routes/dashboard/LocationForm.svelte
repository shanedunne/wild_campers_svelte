<script>
  /* functionality for uploading file
  const fileInput = document.querySelector(".file-input");
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector(".file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };
  */

  // temporary cateory list
  const categories = ["Mountain", "Forest", "Beach", "Lake"];

  let locationName = $state("Wicklow Mountains");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let selectedCategory = $state("Mountains");
  let locationDescription = $state("Tell us about the location");
  let accessibleByVehicle = $state();
  let petFriendly = $state();
  let swimming = $state();
  let hiking = $state();
  let closeToTown = $state();
  let greatViews = $state();
  

  async function addLocation() {
    console.log(
      `Just added: ${locationName} with latitude of ${lat} and longitude of ${lng}. The location category is described as ${selectedCategory} and the user said the following ${locationDescription}`
    );
  console.log(
    `Accessible by vehicle: ${accessibleByVehicle}, Pet friendly: ${petFriendly}, Swimming: ${swimming}, Hiking: ${hiking}, Close to town: ${closeToTown}, Great views: ${greatViews}`
  );
  }
</script>

<div class="container my-4">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h2>Add a location</h2>
      <div class="mb-3">
        <div class="mb-3">
          <label for="locationName" class="form-label">Location Name</label>

          <input
            bind:value={locationName}
            type="text"
            id="locationName"
            class="form-control"
            placeholder="Location Name"
            aria-label="name"
            name="name"
          />
        </div>
        <div class="row">
          <div class="mb-3">
            <label for="categoryId" class="form-label">Category</label>
            <select
              bind:value={selectedCategory}
              class="form-select"
              name="categoryId"
              aria-label="Default select example"
            >
              <option selected>Category</option>
              {#each categories as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="latitude" class="form-label">Latitude</label>
            <input
              bind:value={lat}
              type="text"
              id="latitude"
              class="form-control"
              placeholder="Latitude"
              aria-label="latitude"
              name="latitude"
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="longitude" class="form-label">Longitude</label>

            <input
              bind:value={lng}
              type="text"
              id="longitude"
              class="form-control"
              placeholder="Longitude"
              aria-label="longitude"
              name="longitude"
            />
          </div>
        </div>
        <!--Left side-->
        <div class="row mb-3">
          <h4>Good To Know</h4>
          <div class="col-md-6">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={accessibleByVehicle}
                id="accessibleByVehicle"
              />
              <label class="form-check-label" for="accessibleByVehicle">
                Accessible By Vehicle
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={petFriendly}
                value=""
                id="petFriendly"
              />
              <label class="form-check-label" for="petFriendly">
                Pet Friendly
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={swimming}
                value=""
                id="swimming"
              />
              <label class="form-check-label" for="swimming">
                Swimming Nearby
              </label>
            </div>
          </div>
          <!--right side-->
          <div class="col-md-6">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={hiking}
                value=""
                id="hiking"
              />
              <label class="form-check-label" for="hiking">
                Hiking Nearby
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={closeToTown}
                value=""
                id="closeToTown"
              />
              <label class="form-check-label" for="closeToTown">
                Close to Town
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={greatViews}
                value=""
                id="greatViews"
              />
              <label class="form-check-label" for="greatViews">
                Great Views
              </label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="locationDescription" class="form-label">Location Description</label>
          <textarea
            bind:value={locationDescription}
            id="locationDescription"
            name="locationDescription"
            class="form-control"
            placeholder="Location Description"
            rows="3"
          ></textarea>
        </div>
        <div class="d-grid">
          <button
            type="submit"
            class="btn submit-button mx-auto"
            onclick={() => addLocation()}>Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* submit button */
  .submit-button {
    background-color: #606c38;
    color: #fefae0;
    transition: color 0.3s;
  }

  .submit-button:hover {
    background-color: #283618;
    color: #fefae0;
  }
  .form-control,
  .form-select {
    background-color: #fcf5d8;
  }

  .form-control:focus {
    background-color: #fcf5d8;
  }
</style>

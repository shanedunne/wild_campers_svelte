<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { appServices } from "$lib/services/app-services";
  import type { Location } from "$lib/types/app-types";
  import Message from "$lib/ui/Message.svelte";
  import { goto } from "$app/navigation";

  // declare image
  let imageFiles: File[] = $state([]);

  // handle file when selected
  function onFileSelected(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const newImages = Array.from(target.files);
      for (const image of newImages) {
        imageFiles.push(image);
      }
      imageFiles = [...imageFiles];

      target.value = "";
    }
  }

  // allow for removal of file from imageFiles before submitting
  function removeImage(image: File) {
    imageFiles = imageFiles.filter((file) => file !== image);
  }

  // Declare category type and get list as prop
  let { categoryList = [] } = $props();

  // declare message
  let message = $state("");
  let status = $state("");

  let locationName = $state("Wicklow Mountains");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let selectedCategory = $state("Mountains");
  let locationDescription = $state("Tell us about the location");
  let accessibleByVehicle = $state(false);
  let petFriendly = $state(false);
  let swimming = $state(false);
  let hiking = $state(false);
  let closeToTown = $state(false);
  let greatViews = $state(false);

  async function addLocation() {
    if (
      locationName &&
      lat &&
      lng &&
      selectedCategory &&
      imageFiles &&
      imageFiles.length > 0 &&
      locationDescription !== null
    ) {
      const category = categoryList.find(
        (category) => category.categoryName === selectedCategory
      );

      if (category) {
        const location: Location = {
          name: locationName,
          latitude: lat.toString(),
          longitude: lng.toString(),
          locationDescription: locationDescription,
          categoryId: category._id,
          accessibleByVehicle: accessibleByVehicle,
          petFriendly: petFriendly,
          swimming: swimming,
          hiking: hiking,
          closeToTown: closeToTown,
          greatViews: greatViews,
          locationImages: imageFiles,
        };

        const success = await appServices.addLocation(
          location,
          loggedInUser.token,
          imageFiles
        );

        if (!success) {
          message = "Error adding location";
          status = "danger";
          return;
        }
        message = `You have successfully added ${locationName} to Wild Campers!`;
        status = "success";
        setTimeout(() => {
          goto("/dashboard");
        }, 3000);
      }
    } else {
      message = "Please ensure you have filled in all fields";
      status = "danger";
    }
  }
</script>

<div class="container my-4">
  <div class="row justify-content-center">
    <div class="col">
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
            {#each categoryList as category}
              <option value={category.categoryName}
                >{category.categoryName}</option
              >
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
            <label class="form-check-label" for="hiking"> Hiking Nearby </label>
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
        <label for="locationDescription" class="form-label"
          >Location Description</label
        >
        <textarea
          bind:value={locationDescription}
          id="locationDescription"
          name="locationDescription"
          class="form-control"
          placeholder="Location Description"
          rows="3"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="locationImage" class="form-label"
          >Upload Location Image</label
        >
        <input
          id="locationImage"
          class="form-control file-input"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onchange={onFileSelected}
        />
      </div>
      <div class="selected-images">
        {#if imageFiles.length > 0}
          <div class="mt-2">
            <h6>Selected Images</h6>
            <ul>
              {#each imageFiles as img, i (img.name + i)}
                <li
                  class="d-flex justify-content-between align-items-center mb-1"
                >
                  <span class="file-name">{img.name}</span>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onclick={() => removeImage(img)}>Remove</button
                  >
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <div class="d-grid">
        <button
          type="submit"
          class="btn submit-button mx-auto"
          onclick={() => addLocation()}>Submit</button
        >
      </div>

      {#if message}
        <div class="mt-3">
          <Message {message} {status} />
        </div>
      {/if}
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

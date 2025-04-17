<script lang="ts">
    let { firstName = $bindable(""), lastName = $bindable("") } = $props();
  </script>

  <div class="form-container mb-3">
      <div class="row g-3">
        <div class="col-sm-6">
          <input
            bind:value={firstName}
            type="text"
            id="firstName"
            class="form-control"
            placeholder="First name"
            aria-label="First name"
            name="firstName"
          />
        </div>
        <div class="col-sm-6">
          <input
            bind:value={lastName}
            type="text"
            id="lastName"
            class="form-control"
            placeholder="Last name"
            aria-label="Last name"
            name="lastName"
          />
        </div>
      </div>
  </div>

<style>
    .form-container .form-control {
      background-color: #fcf5d8;
    }
    
    .form-container .form-control:focus {
      background-color: #fcf5d8;
    }
  </style>
<script lang="ts">
  let { email = $bindable(""), password = $bindable("") } = $props();
</script>

<div
  class="d-flex justify-content-center align-items-center"
>
  <div class="form-container">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email address</label>
        <input
          type="email"
          bind:value={email}
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
        />
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Password</label>
        <input
          type="password"
          bind:value={password}
          class="form-control"
          id="password"
          name="password"
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
<script lang="ts">
  let { email = $bindable(""), password = $bindable("") } = $props();
</script>


  <div class="form-container vstack">
      <div class="input-group mb-3">
        <span class="input-group-text border-end-0">
          <i class="fa fa-envelope"></i>
        </span>
        <input
          type="email"
          bind:value={email}
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          placeholder="email"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text border-end-0">
          <i class="fas fa-key"></i>
        </span>
      
        <input
          type="password"
          bind:value={password}
          class="form-control border-start-0"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
  </div>

<style>
  .form-container .form-control {
    background-color: #fcf5d8;
    
  }
  
  .form-container .form-control:focus {
    background-color: #fcf5d8;
  }

  .input-group-text {
    background-color: #f6e4c0;
  }
</style>
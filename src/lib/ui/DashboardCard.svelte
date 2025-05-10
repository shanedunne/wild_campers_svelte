<script lang="ts">
    export let title: string = "";
  </script>
  
  <div class="card mb-5">
    <div class="card-header d-flex align-items-center">
      <h2 class="mb-0">{title}</h2>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>

<style>
  .card {
    background-color: #fefae0;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
  }

  .card-header {
    background-color: #f6e4c0;
    border-bottom: none;
    padding-bottom: 1rem;
  }

  .card-body {
    padding: 0;
  }

</style>

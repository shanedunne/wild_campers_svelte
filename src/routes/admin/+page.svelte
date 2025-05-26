<script lang="ts">
    import AddCategoryForm from './AddCategoryForm.svelte'
    import UserTable from '$lib/ui/UserTable.svelte';
  </script>
  
  <h1 class="mb-4 text-center">Admin Dashboard</h1>
  
  <div class="container-fluid">
    <div class="row gy-4">

      <div class="col-lg-4 order-lg-1">
        <AddCategoryForm />
      </div>
    </div>
  </div>
  
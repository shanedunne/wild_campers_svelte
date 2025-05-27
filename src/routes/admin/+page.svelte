<script lang="ts">
  import AddCategoryForm from "./AddCategoryForm.svelte";
  import ListCategory from "$lib/ui/ListCategory.svelte";
  import AmenityBarChart from "$lib/ui/AmenityBarChart.svelte";
  import CategoryPieChart from "$lib/ui/CategoryPieChart.svelte";
</script>

<div class="title">
    <h1 class="mb-4 text-center">Admin Dashboard</h1>
</div>


<div class="container-fluid">
  <div class="row gy-4">
    <div class="col-lg-4">
        <AddCategoryForm />
        <ListCategory />
      </div>
    <div class="col-lg-4">
      <AmenityBarChart />
    </div>
    <div class="col-lg-4">
        <CategoryPieChart />
      </div>
  </div>
</div>

<style>
    .title {
        margin: 4em;
    }
</style>
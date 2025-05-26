<script lang="ts">
  import { onMount } from "svelte";
  import { appServices } from "$lib/services/app-services";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Category } from "$lib/types/app-types";
  import Card from "./Card.svelte";

  let categories: Category[] = [];
  let loading = true;

  onMount(async () => {
    categories = await appServices.getCategories(loggedInUser.token);
    loading = false;
  });

  async function deleteCategory(id: string) {
    const categoryToDelete = await appServices.deleteCategory(
      id,
      loggedInUser.token
    );
    if (categoryToDelete) {
      categories = categories.filter((category) => category._id !== id);
    } else {
      console.log("could not delete category");
    }
  }
</script>

<Card title="Categories">
  <div class="my-4">
    <div class="mx-4"></div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each categories as category}
            <tr>
              <td>{category.categoryName}</td>
              <td
                ><button
                  class="btn btn-sm btn-outline-danger"
                  title="Delete"
                  on:click={() => deleteCategory(category._id)}>Delete</button
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Card>

<style>
  .table,
  td,
  th {
    background-color: #fcf5d8;
  }
</style>

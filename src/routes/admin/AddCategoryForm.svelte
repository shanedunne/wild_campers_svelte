<script lang="ts">
    import { appServices }  from '$lib/services/app-services';
    import { loggedInUser } from '$lib/runes.svelte';
  
    let categoryName = '';
    let msg = '';
    let busy = false;
  
    async function add() {
      if (!categoryName.trim() || busy) return;
      busy = true;
      const success = await appServices.addCategory(
        categoryName,
        loggedInUser.token
      );
      msg  = success ? 'Category added' : 'Couldn’t add';
      if (success) categoryName = '';
      busy = false;
      if (success) window.location.reload();
    }
  </script>
  
  <div class="card shadow-sm">
    <div class="card-header fw-semibold">Add Category</div>
    <div class="card-body">
      <input  class="form-control mb-2"
              placeholder="Category name"
              bind:value={categoryName}
              on:keydown={(e)=>e.key==='Enter' && add()} />
  
      <button class="btn btn-primary w-100" on:click={add} disabled={busy}>
        {busy ? 'Saving…' : 'Add'}
      </button>
  
      {#if msg}<div class="small mt-2 text-muted">{msg}</div>{/if}
    </div>
  </div>
  
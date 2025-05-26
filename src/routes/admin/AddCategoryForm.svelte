<script lang="ts">
    import { appServices }  from '$lib/services/app-services';
    import { loggedInUser } from '$lib/runes.svelte';
    import Card from '$lib/ui/Card.svelte';
  
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
  
  <Card title="Add Category">
      <input  class="form-control mb-2"
              placeholder="Category name"
              bind:value={categoryName}
              on:keydown={(e)=>e.key==='Enter' && add()} />
  
      <button class="btn add-button" on:click={add} disabled={busy}>
        {busy ? 'Saving…' : 'Add'}
      </button>
  
      {#if msg}<div class="small mt-2 text-muted">{msg}</div>{/if}
    </Card>

    <style>
        /* add button */
        .add-button {
          background-color: #606c38;
          color: #fefae0;
          transition: color 0.3s;
        }
      
        .add-button:hover {
          background-color: #283618;
          color: #fefae0;
        }
        .form-control {
          background-color: #fcf5d8;
        }
      
        .form-control:focus {
          background-color: #fcf5d8;
        }
      </style>
      
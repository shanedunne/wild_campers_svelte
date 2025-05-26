
<!--


<script lang="ts">
    import { onMount }  from 'svelte';
    import { appServices }  from '$lib/services/app-services';
    import { loggedInUser } from '$lib/runes.svelte';
    import type { User } from '$lib/types/app-types';
  
    let users: User[] = [];
    let loading = true;
  
    onMount(async () => {
      users = await appServices.getUsers(loggedInUser.token);
      loading = false;
    });
  
    async function delete(id: string) {
      const deleteUser = await appServices.deleteUser(id, loggedInUser.token);
      if (deleteUser){
        users = users.filter(user => user._id !== id);
        return id;
      } 
    }
  </script>

<div class="my-4">
    <div class="mx-3 ">
    <h2>Current Users</h2>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td><button class="btn btn-sm btn-outline-danger"
                title="Delete"
                on:click={() => delete(user._id!)}>×</button></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div> 
  </div>


-->
<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";

  // loggedInUser
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <div>Wild Campers</div>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        {#if loggedInUser.email}
          <li class="nav-item">
            <a class="nav-link" href="/dashboard">Dashboard</a>
          </li>
          {#if loggedInUser.role === "ADMIN"}
        <li class="nav-item">
          <a class="nav-link" href="/admin">Admin</a>
        </li>
        {/if}
          <li class="nav-item">
            <a class="nav-link" href="/logout">Logout [{loggedInUser.email}]</a>
          </li>
        {/if}
        {#if !loggedInUser.email}
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/signup">Signup</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<style>
  nav {
    width: 100vw;
    background-color: #606c38;
  }

  .navbar-brand {
    color: #2f1d0e;
    font-weight: bolder;
  }

  .navbar-nav .nav-link {
    color: #2f1d0e;
    font-weight: bold;
    transition: color 0.3s;
  }

  .navbar-nav .nav-link:hover {
    color: #bc6c25;
  }
</style>

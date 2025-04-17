<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
</script>

<section class="login-container">
  <div class="login-form">
    <h1 class="text-center m-0">Login</h1>
    <LoginForm />
  </div>
</section>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fefae0;
    min-height: 100vh;
  }
  .login-form {
    max-width: 400px;
    width: 100%;
  }
</style>

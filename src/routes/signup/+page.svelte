<script lang="ts">
    import SignupForm from "./SignupForm.svelte";
  </script>
  
  <section class="signup-container">
    <div class="signup-form">
      <h1 class="text-center m-0">Signup</h1>
      <SignupForm />
    </div>
  </section>
  
  <style>
    .signup-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fefae0;
      min-height: 100vh;
    }
  </style>
  
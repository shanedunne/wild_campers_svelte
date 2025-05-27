<script lang="ts">
  import { goto } from "$app/navigation";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import { appServices } from "$lib/services/app-services";
  import Message from "$lib/ui/Message.svelte";
  import { loggedInUser } from "$lib/runes.svelte"; // Import loggedInUser to update it

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");
  let isSubmitting = $state(false);

  async function signup() {
    // ensures no double clicking
    if (isSubmitting) {
      return;
    }


    const newUserDetails = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password,
    };

    // check to make sure all fields are fiulled
    if (!firstName || !lastName || !email || !password) {
      message = "All fields are required.";
      isSubmitting = false;
      return;
    }

    // check to make sure email format submitted
    if (
      !newUserDetails.email.includes("@") ||
      newUserDetails.email.length < 5
    ) {
      message = "Please enter a valid email address.";
      isSubmitting = false;
      return;
    }

    // check to make sure masswork is at least 8 characters
    if (newUserDetails.password.length < 8) {
      // Match backend Joi rule if possible
      message = "Password must be at least 8 characters long.";
      isSubmitting = false;
      return;
    }
    try {
      const signupSuccess = await appServices.signup(newUserDetails);
      if (signupSuccess) {

        const session = await appServices.login(
          newUserDetails.email,
          newUserDetails.password
        );
        if (session) {
          loggedInUser.email = email;
          loggedInUser.name = session.name;
          loggedInUser.token = session.token;
          loggedInUser._id = session._id;
          loggedInUser.role = session.role;
          localStorage.wildCampers = JSON.stringify(loggedInUser);

          goto("/dashboard");
        } else {
          message =
            "Signup successful, but automatic login failed. Please try logging in manually.";
          console.error("Login after signup failed to return a session.");
        }
      } else {
        message =
          "Error signing up. The email might already be in use, or an unexpected error occurred. Please try again.";
        console.error("appServices.signup returned false.");
        setTimeout(() => {
          window.location.reload();
        }, 300000);
      }
    } catch (error) {
      console.error("error signing up", error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section
  class="d-flex flex-column align-items-center justify-content-center py-5"
>
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button onclick={() => signup()} class="signup-button btn">Sign Up</button>
  <p class="text-center">
    Already have an account? <a href="/login" data-cy="login-redirect"
      >Login Here</a
    >
  </p>
  <div>
    {#if message}
      <Message {message} />
    {/if}
  </div>
</section>

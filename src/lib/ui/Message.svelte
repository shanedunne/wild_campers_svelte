<script lang="ts">
  let { message } = $props();
</script>

<article class="message is-danger">
  <div
    class="alert alert-danger d-flex align-items-center gap-2 shadow-sm"
    role="alert"
  >
    <i class="fas fa-exclamation-circle"></i>
    <span>{message}</span>
  </div>
</article>

<style>
  .alert {
    font-weight: 600;
  }
  </style>
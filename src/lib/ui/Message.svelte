<script lang="ts">
  let { message, status } = $props();
</script>

<article class="message is-{status}">
  <div
    class="alert alert-{status} d-flex align-items-center gap-2 shadow-sm"
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
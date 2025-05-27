<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { appServices } from "$lib/services/app-services";
    import { getCategoryCounts } from "$lib/services/stats";
    import { loggedInUser } from "$lib/runes.svelte";
    import Card from "./Card.svelte";
  
    let canvas: HTMLCanvasElement;
  
    onMount(async () => {
      const token = loggedInUser.token;
      const locations = await appServices.getLocations(loggedInUser.token);
      const categories = await appServices.getCategories(loggedInUser.token);



    const data = await getCategoryCounts(locations, categories);
    if (!data.length || data.every(d => d.value === 0)) return;
  
      new Chart(canvas, {
        type: "pie",
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            }
          ]
        },
        options: { plugins: { legend: { position: "right" } } }
      });
    });
  </script>
  
  <Card title="Categories">
  <div class="chart-wrapper">
    <canvas bind:this={canvas}></canvas>
  </div>
</Card>
  
<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { appServices } from "$lib/services/app-services";
  import { getAmenityCounts } from "$lib/services/stats";
  import { loggedInUser } from "$lib/runes.svelte";
  import Card from "./Card.svelte";

  let canvas: HTMLCanvasElement;

  onMount(async () => {
    const locations = await appServices.getLocations(loggedInUser.token);
    const data = getAmenityCounts(locations);

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: 'My First Dataset',

            data: data.map((d) => d.value),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            
          },
        ],
      },
      options: {
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
        plugins: { legend: { display: false } },
      },
    });
  });
</script>

<Card title="Amenities">
<div class="chart-wrapper">
  <canvas bind:this={canvas}></canvas>
</div>
</Card>

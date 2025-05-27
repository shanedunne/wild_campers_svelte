<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let lat: string;
  export let lon: string;

  const weather = writable<{
    temp: number;
    description: string;
    icon: string;
  } | null>(null);

  const error = writable<string | null>(null);

  onMount(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API}`
      );
      if (!response.ok) throw new Error(`open weather map: ${response.status}`);

      const data = await response.json();

      weather.set({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (e) {
      error.set(`Weather unavailable`);
      console.error(e);
    }
  });
</script>

{#if $weather}
  <div class="weather-card">
    <img
      src={`https://openweathermap.org/img/wn/${$weather.icon}@2x.png`}
      alt="icon"
    />
    <div class="temp">{$weather.temp}°C</div>
    <div class="text-capitalize">{$weather.description}</div>
  </div>
{:else if $error}
  <div class="weather-card">{$error}</div>
{:else}
  <div class="weather-card">loading…</div>
{/if}

<style>
  .weather-card {
    background: #fefae0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  .temp {
    font-size: 1.25rem;
    font-weight: 600;
  }
  img {
    width: 40px;
    height: 40px;
  }
</style>

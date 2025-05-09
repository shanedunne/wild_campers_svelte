<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ markerClick: string }>();


  let id = "home-map-id";
  let location = { lat: 53.2734, lng: -7.7783203 };
  let zoom = 8;
  let minZoom = 7;
  let activeLayer = "Lake";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    baseLayers = {
      Lake: leaflet.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
      ),
      Forest: leaflet.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      ),
      Beach: leaflet.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      ),
      Mountain: leaflet.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 17,
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
      ),
      Sea: leaflet.tileLayer(
        "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png",
        {
          attribution:
            'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors',
        }
      ),
    };

    let defaultLayer = baseLayers[activeLayer];
    imap = leaflet.map("map-div", {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer],
    });
    control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
  });

  // add markers function
  export async function addMarker(latitude: string, longitude: string, title: string, img = "", _id: string) {

    let locationURL = `/location/${_id}`;
    // define popup html
    const popupHtml = `
 <div "style="width:190px">
      <img src=${img} style="width:100%;height:100px;object-fit:cover;border-radius:4px">
      <a class="text-reset text-decoration-none" href=${locationURL}>
      <h6 class="mt-2 mb-1" style="font-weight:600">${title}</h6>
      </a>
      <small class="text-muted">${latitude}°, ${longitude}°</small>
    </div>`;

    const leaflet = await import("leaflet");
    L = leaflet.default;
    const marker = L.marker([latitude, longitude]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupHtml);
    marker.bindPopup(popup);
  }

  // move to selected popup
  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat: lat, lng: lng });
  }




</script>

<div id="map-div" class="leaflet-map" ></div>

<style>

.leaflet-map {
    width: 100%;
    height: var(--map-height, 43vh);
  }
</style>
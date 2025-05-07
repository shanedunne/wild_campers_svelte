<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap } from "leaflet";

  let { height = 80 } = $props();
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
  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }


</script>

<div id="map-div" class="box" style="height: {height}vh"></div>

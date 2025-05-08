import { loggedInUser } from "$lib/runes.svelte";
import type { Category, Location } from "$lib/types/app-types";
import type LeafletMap from "$lib/ui/LeafletMap.svelte";
import { appServices } from "./app-services"; 

export async function refreshLocationMap(map: LeafletMap) {
    const locations = await appServices.getLocations(loggedInUser.token);
    locations.forEach((location: Location) => {
        map.addMarker(parseFloat(location.latitude), parseFloat(location.longitude), location.name);

    });
    const lastLocation = locations[locations.length - 1];
    if (lastLocation) map.moveTo(parseFloat(lastLocation.latitude), parseFloat(lastLocation.longitude));
}
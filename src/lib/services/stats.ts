import type { Category, Location } from "$lib/types/app-types";
import { loggedInUser } from "$lib/runes.svelte";
import { appServices } from "$lib/services/app-services";



// Get location by category count
export async function getCategoryCounts(locations: Location[], categories: Category[]) {

  // declare count
  const count: Record<string, number> = {};

  // loop through locations and count instances of category ids
  locations.forEach((location) => {
    const id = location.categoryId._id;
    count[id] = (count[id] || 0) + 1;
  });

  // return the category name with its count
  return categories.map((category) => ({
    label: category.categoryName,
    value: count[category._id!] ?? 0,
  }));
}

// ammenities count
export function getAmenityCounts(locations: Location[]) {

    // declare possible keys to check
  const keys = [
    ["accessibleByVehicle", "Vehicle Access"],
    ["petFriendly", "Pet Friendly"],
    ["swimming", "Swimming"],
    ["hiking", "Hiking"],
    ["closeToTown", "Close to Town"],
    ["greatViews", "Great Views"],
  ] as const;

  
  return keys.map(([key, label]) => ({
    label,
    value: locations.filter((l) => (l as any)[key]).length,
  }));
}

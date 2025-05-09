<script lang="ts">
  import type { Location } from "$lib/types/app-types";
  export let location: Location;

  const ammenityIcon = (value: boolean, faIcon: string, label: string) => {
    const colour = value ? "success" : "secondary";

    return `
			<span class="badge bg-${colour} d-flex align-items-center gap-1 px-3 py-2 w-100">
				<i class="fas fa-${faIcon}"></i>
				<span>${label}</span>
			</span>
		`;
  };
</script>

<div class="location-content">
    
    <ul class="list-unstyled row gy-2 amenities">
      <li class="col-6 col-md-4">
        {@html ammenityIcon(
          location.accessibleByVehicle,
          "car",
          "Vehicle Access"
        )}
      </li>
      <li class="col-6 col-md-4">
        {@html ammenityIcon(location.petFriendly, "paw", "Pet Friendly")}
      </li>
      <li class="col-6 col-md-4">
        {@html ammenityIcon(location.swimming, "swimmer", "Swimming")}
      </li>
      <li class="col-6 col-md-4">
        {@html ammenityIcon(location.hiking, "hiking", "Hiking")}
      </li>
      <li class="col-6 col-md-4">
        {@html ammenityIcon(
          location.closeToTown,
          "city",
          "Close to Town"
        )}
      </li>
      <li class="col-6 col-md-4">
        {@html ammenityIcon(
          location.greatViews,
          "binoculars",
          "Great Views"
        )}
      </li>
    </ul>
  </div>
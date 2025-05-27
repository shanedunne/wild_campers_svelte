import { appServices } from "$lib/services/app-services";
import type { Session } from "$lib/types/app-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("wild-camper-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      donations: await appServices.getLocations(session.token),
      candidates: await appServices.getCategories(session.token)
    };
  }
};

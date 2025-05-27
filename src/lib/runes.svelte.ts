import type { Category, Location } from "./types/app-types";

export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    role: "",
    _id: ""
 });

 export const currentLocations = $state({
    locations: [] as Location[],
  });
  export const currentCategories = $state({ categories: [] as Category[] });
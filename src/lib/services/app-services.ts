import axios from "axios";
import type { Session, User, Location, Category } from "$lib/types/app-types";

export const appServices = {
  baseUrl: "http://localhost:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // Function to call the api login
  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/authenticate`,
        { email, password }
      );
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id,
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  // add location
  async addLocation(location: Location, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(this.baseUrl + "/api/locations", {
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        categoryId: location.categoryId,
        locationDescription: location.locationDescription,
        accessibleByVehicle: location.accessibleByVehicle,
        petFriendly: location.petFriendly,
        swimming: location.swimming,
        hiking: location.hiking,
        closeToTown: location.closeToTown,
        greatViews: location.greatViews,
      });
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // get all locations
  async getLocations(token: string): Promise<Location[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/locations");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  // get location by id
  async getLocation(id: string, token: string): Promise<Location> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const { data } = await axios.get(this.baseUrl + "/api/locations/" + id);
      const location: Location = {
        name: data.name,
        categoryId: data.categoryId,
        latitude: data.latitude,
        longitude: data.longitude,
        locationDescription: data.locationDescription,
        // locationImage: response.data.locationImage,
        accessibleByVehicle: data.accessibleByVehicle,
        petFriendly: data.petFriendly,
        swimming: data.swimming,
        hiking: data.hiking,
        closeToTown: data.closeToTown,
        greatViews: data.greatViews,
      };
      return location;
    } catch (error) {
      console.log(error);
      return {
        name: "",
        categoryId: "",
        latitude: "",
        longitude: "",
        locationDescription: "",
        // locationImage: response.data.locationImage,
        accessibleByVehicle: false,
        petFriendly: false,
        swimming: false,
        hiking: false,
        closeToTown: false,
        greatViews: false,
      };
    }
  },

  // get all categories
  async getCategories(token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

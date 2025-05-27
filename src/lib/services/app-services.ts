import axios from "axios";
import type { Session, User, Location, Category } from "$lib/types/app-types";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const appServices = {
  baseUrl: VITE_API_BASE_URL ,

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      if (response.status === 201 && response.data) {
        return true;
      }
      return false;
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
          role: response.data.role,
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
  async addLocation(
    location: Location,
    token: string,
    images?: File[]
  ): Promise<boolean> {
    try {
      const form = new FormData();

      // add all information to form
      form.append("name", location.name);
      form.append("latitude", location.latitude);
      form.append("longitude", location.longitude);
      form.append("locationDescription", location.locationDescription);
      form.append("categoryId", location.categoryId);
      form.append("accessibleByVehicle", String(location.accessibleByVehicle));
      form.append("petFriendly", String(location.petFriendly));
      form.append("swimming", String(location.swimming));
      form.append("hiking", String(location.hiking));
      form.append("closeToTown", String(location.closeToTown));
      form.append("greatViews", String(location.greatViews));

      // if image exists, add it to form
      if (images && images.length > 0) {
        for (const img of images) {
          form.append("locationImage", img, img.name);
        }
      }

      const res = await axios.post(this.baseUrl + "/api/locations", form, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return res.status === 201;
    } catch (err) {
      console.error(err);
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
        locationImages: data.locationImages,
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
        locationImages: [],
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

  // get category
  async getCategory(id: string, token: string): Promise<string> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/categories/" + id);
      return response.data.categoryName;
    } catch (error) {
      console.log(error);
      return "unknown";
    }
  },

  // add categories
  async addCategory(categoryName: string, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(
        this.baseUrl + "/api/categories",
        { categoryName },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // delete category
  async deleteCategory(id: string, token: string): Promise<boolean> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(
        this.baseUrl + "/api/categories/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

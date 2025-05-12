import axios from "axios";
import type { Session, User, Location, Category } from "$lib/types/app-types";
import { getAccessTokenSilently } from '$lib/services/auth0';


export const appServices = {
  baseUrl: "http://localhost:3000",

  // function to apply headers if token
  async _getAuthHeaders() {
    const token = await getAccessTokenSilently();
    if (token) {
      return {Authorization: `Bearer ${token}`};
      }
      console.warn("No access token available for API call.");
    return {};
    },


    // function to sync progile on backend with auth0 implementation
  async syncUserProfile(userData?: any): Promise<boolean> {
    try {
      const headers = await this._getAuthHeaders();
      if (!headers.Authorization) return false;

      const response = await axios.post(`${this.baseUrl}/api/users/sync-profile`, userData || {}, { headers });
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.error("Error syncing user profile:", error);
      return false;
    }
  },
  

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      if(response.status === 201 && response.data){
        return true;
      }
      return false;

    } catch (error) {
      console.log(error);
      return false;
    }
  },
  /*
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
  */
  // add location
  async addLocation(
    location: Location,
    token: string,
    images?: File[]
  ): Promise<boolean> {
    try {
      const headers = await this._getAuthHeaders();
      if (!headers.Authorization) throw new Error("User not authenticated");
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
        headers
      });

      return res.status === 201;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  // get all locations
  async getLocations(): Promise<Location[]> {
    try {
      const headers = await this._getAuthHeaders();
      const response = await axios.get(this.baseUrl + "/api/locations", {headers});
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  // get location by id
  async getLocation(id: string): Promise<Location> {
    try {
      const headers = await this._getAuthHeaders();
      const { data } = await axios.get(this.baseUrl + "/api/locations/" + id, {headers});
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
  async getCategories(): Promise<Category[]> {
    try {
      const headers = await this._getAuthHeaders();
      const response = await axios.get(this.baseUrl + "/api/categories", {headers});
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // get category
  async getCategory(id: string): Promise<string> {
    try {
      const headers = await this._getAuthHeaders();
      const response = await axios.get(this.baseUrl + "/api/categories/" + id, {headers});
      return response.data.categoryName;
    } catch (error) {
      console.log(error);
      return "unknown";
    }
  },
};

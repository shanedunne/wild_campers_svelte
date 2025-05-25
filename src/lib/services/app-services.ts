import axios from "axios";
import type { Session, User, Location, Category } from "$lib/types/app-types";
import { getAccessTokenSilently, getUser } from '$lib/services/auth0';


export const appServices = {
  baseUrl: "http://localhost:3000",

 

    async getToken(): Promise<string | undefined> {
      return await getAccessTokenSilently();
    },


    // function to sync progile on backend with auth0 implementation
  async syncUserProfile(userData?: any): Promise<boolean> {
    try {

      const token = await this.getToken();
      if(!token){
        throw new Error("No Access Token")
      }

      const auth0Data = await getUser();
      const payload   = {
        auth0Id: auth0Data.sub,
        email:   auth0Data.email,
        role:    "USER"
      };
      const response = await axios.post(`${this.baseUrl}/api/users/sync-profile`, payload, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'

        }

       });
      return response.status === 200 || response.status === 201;
    } catch (error) {
      console.error("Error syncing user profile:", error);
      return false;
    }
  },
  

  // add location
  async addLocation(
    location: Location,
    token: string,
    images?: File[]
  ): Promise<boolean> {
    try {
      const token = await this.getToken();
      if(!token){
        throw new Error("No Access Token")
      }

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
          Authorization: `Bearer ${token}`
        }
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
      const token = await this.getToken();
      if(!token){
        throw new Error("No Access Token")
      }
      const response = await axios.get(this.baseUrl + "/api/locations", {headers: {
        Authorization: `Bearer ${token}`
      }});
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  // get location by id
  async getLocation(id: string): Promise<Location> {
    try {
      const token = await this.getToken();
      if(!token){
        throw new Error("No Access Token")
      }
      const { data } = await axios.get(this.baseUrl + "/api/locations/" + id, {headers: {
        Authorization: `Bearer ${token}`
      }});
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
        userId: data.userId
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
        userId: ""
      };
    }
  },

  // get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const token = await this.getToken();
      if(!token){
        throw new Error("No Access Token")
      }
      const response = await axios.get(this.baseUrl + "/api/categories", {headers: {
        Authorization: `Bearer ${token}`
      }});
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // get category
  async getCategory(id: string): Promise<string> {
    try {
      const token = await this.getToken();
      if(!token){
        throw new Error("No Access Token")
      }
      const response = await axios.get(this.baseUrl + "/api/categories/" + id, {headers: {
        Authorization: `Bearer ${token}`
      }});
      return response.data.categoryName;
    } catch (error) {
      console.log(error);
      return "unknown";
    }
  },
};

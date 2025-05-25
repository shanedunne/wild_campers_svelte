import type { UserProfile as Auth0UserProfile } from '@auth0/auth0-spa-js';


export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    auth0Id: string;
    email: string;
    role: string;
    _id?: string;
  }

  export interface CurrentSession {
    isLoading: boolean;
    isAuthenticated: boolean;
    auth0Profile?: Auth0UserProfile;
    user?: User;
    accessToken?: string;
    error?: any;
  }

  export interface Location {
    name: string;
    latitude: string;
    longitude: string;
    categoryId: string;
    userId: string;
    locationDescription: string;
    accessibleByVehicle: boolean;
    petFriendly: boolean;
    swimming: boolean;
    hiking: boolean;
    closeToTown: boolean;
    greatViews: boolean;
    locationImages: File[];
    _id?: string;
  }
  export interface Category {
    categoryName: string;
    _id?: string;
  }
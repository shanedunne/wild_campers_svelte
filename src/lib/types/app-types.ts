export interface Session {
    name: string;
    _id: string;
    token: string;
    role: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }
  export interface Location {
    name: string;
    latitude: string;
    longitude: string;
    categoryId: string;
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
export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }
  export interface Location {
    locationName: string;
    lat: number;
    lng: number;
    selectedCategory: string;
    locationDescription: string;
    accessibleByVehicle?: boolean;
    petFriendly?: boolean;
    swimming?: boolean;
    hiking?: boolean;
    closeToTown?: boolean;
    greatViews?: boolean;
    _id?: string;
  }
  export interface Category {
    categoryName: string;
    _id?: string;
  }
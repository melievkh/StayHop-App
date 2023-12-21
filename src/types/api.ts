import { AddressValues, CreateAccommodationValues } from './accommodation';
import { Gender } from './common';
import { ThemeType } from './ui';

export interface Profile {
  id: string;
  phoneNumber: string;
  imageUrl: string;
  gender: Gender;
  country: string;
  language: string;
  uiTheme: ThemeType;
  description: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  actiovationLink: string;
  profile: Profile;
}

export interface CreateProfileParams {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: Gender;
  description?: string;
  country?: string;
  language?: string;
  imageUrl?: string | undefined;
  uiTheme?: ThemeType;
}

export interface UpdateProfileParams {
  id: string | undefined;
  formValues: CreateProfileParams;
}

export interface CreateAccommodationParams {
  accommodation: CreateAccommodationValues;
  address: AddressValues;
}

export interface UpdateAccommodationParams extends CreateAccommodationParams {
  accommodationId: string;
}

export interface Accommodation {
  id: string;
  thumbnailUrl: string;
  previewImgUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  allowedNumberOfPeople: number;
  availableFrom: string;
  availableTo: string;
  description: string;
  ownerId: string;
  address: {
    id: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}

const ENDPOINTS = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  signout: '/auth/signout',
  refresh: (id: string) => `/auth/${id}/refresh`,
  verify: '/auth/verify',

  createProfile: '/users/profile',
  updateProfile: (userId: string | undefined) => `/users/${userId}`,
  getProfile: (userId: string) => `/users/profile/${userId}`,
  addProfileImage: (profileId: string) => `/users/${profileId}/image`,

  getUserDetails: (userId: string) => `/users/${userId}`,

  createAccomodation: '/accommodations',
  updateAccomodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  getMyAccommodations: (userId: string) => `/accommodations/${userId}/accommodations`,
  uploadAccomodationImage: (accommodationId: string) => `/accommodations/${accommodationId}/file`,
  deleteAccomodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  getAllAccomodations: '/accommodations',
  getAccomodationById: (accommodationId: string) => `/accommodations/${accommodationId}`,

  addToWishlist: (accommodationId: string) => `/wishlist/${accommodationId}`,
  removeFromWishlist: (accommodationId: string) => `/wishlist/${accommodationId}`,
  getWishlists: `/wishlist`,

  getAmenitiesList: '/amenities',
  accomodationAmenities: (accommodationId: string) => `/amenities/${accommodationId}`,

  getHostProfile: (hostId: string) => `/users/host/${hostId}`,
};

export default ENDPOINTS;

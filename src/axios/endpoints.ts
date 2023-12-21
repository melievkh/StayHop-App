const ENDPOINTS = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  signout: '/auth/signout',
  refresh: (id: string) => `/auth/${id}/refresh`,
  verify: '/auth/verify',

  createProfile: '/users/profile',
  updateProfile: (userId: string | undefined) => `/users/profile/${userId}`,
  getProfile: (userId: string | null) => `/users/profile/${userId}`,

  getUserDetails: (userId: string | null) => `/users/${userId}`,

  createAccomodation: '/accommodations',
  updateAccomodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  getMyAccommodations: `/accommodations/getAll`,
  uploadAccomodationImage: (accommodationId: string) => `/accommodations/file/${accommodationId}`,
  deleteAccomodation: (accommodationId: string) => `/accommodations/${accommodationId}`,
  getAllAccomodations: '/accommodations',
  getAccomodationById: (accommodationId: string) => `/accommodations/${accommodationId}`,
};

export default ENDPOINTS;

import { RootState } from '..';

export const getAccountInfos = (state: RootState) => state.account.result;
export const getAccountLoader = (state: RootState) => state.account.pending;
export const getAccountError = (state: RootState) => state.account.error;
export const getIsGuestAccount = (state: RootState) => state.account.isGuest;
export const getIsLoggedIn = (state: RootState) => state.account.isLoggedIn;
export const getUserId = (state: RootState) => state.account.user_id;

export const getUserDetails = (state: RootState) => state.user.result;

export const getColors = (state: RootState) => state.theme.colors;
export const getIsDarkMode = (state: RootState) => state.theme.isDark;

export const getAccommodation = (state: RootState) => state.accommodation.result;
export const getAccommodationError = (state: RootState) => state.accommodation.error;
export const getAccommodationLoader = (state: RootState) => state.accommodation.pending;

export const getMyAccommodations = (state: RootState) => state.myAccommodationsList.result;
export const getMyAccommodationsError = (state: RootState) => state.myAccommodationsList.error;
export const getMyAccommodationsLoader = (state: RootState) => state.myAccommodationsList.pending;

export const getFilterParams = (state: RootState) => state.accommodationList.filters;
export const getSearchParams = (state: RootState) => state.accommodationList.search;
export const getAccommodationList = (state: RootState) => state.accommodationList.result;
export const getAccommodationListLoading = (state: RootState) => state.accommodationList.pending;

export const getWishlists = (state: RootState) => state.wishlist.result;
export const getWishlistLoader = (state: RootState) => state.wishlist.pending;
export const getWishlistError = (state: RootState) => state.wishlist.error;

export const getHostProfile = (state: RootState) => state.hostProfile.result;
export const getHostProfileLoader = (state: RootState) => state.hostProfile.pending;
export const getLanguage = (state: RootState) => state.language.language;

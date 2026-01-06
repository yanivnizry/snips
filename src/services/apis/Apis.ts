import {axiosClient} from './AxiosClient';
import {API_ENDPOINTS} from '../constants/common';
import type {
  HomePageResponse,
  FeedPageResponse,
} from '../types/ApiTypes';

/**
 * Generic API fetch function that handles GET requests
 * @param endpoint - The API endpoint to fetch from
 * @returns Promise resolving to the response data
 * @throws Error if the request fails
 */
const fetchApi = async <T>(endpoint: string): Promise<T> => {
  const response = await axiosClient.get<T>(endpoint);
  return response.data;
};

/**
 * Fetches the home page data including featured content, categories, and more titles
 * @returns Promise resolving to HomePageResponse
 */
export const getHomePage = (): Promise<HomePageResponse> =>
  fetchApi<HomePageResponse>(API_ENDPOINTS.HOME_PAGE);

/**
 * Fetches a paginated feed page
 * @param page - The page number to fetch (default: 1)
 * @returns Promise resolving to FeedPageResponse
 */
export const getFeedPage = (page: number = 1): Promise<FeedPageResponse> =>
  fetchApi<FeedPageResponse>(`${API_ENDPOINTS.FEED_PAGE}?page=${page}`);

export const apis = {
  getHomePage,
  getFeedPage,
} as const;


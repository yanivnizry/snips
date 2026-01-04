import {axiosClient} from './AxiosClient';
import {API_ENDPOINTS} from '../constants/Constants';
import type {
  HomePageResponse,
  FeedPageResponse,
} from '../types/ApiTypes';

const fetchApi = async <T>(endpoint: string): Promise<T> => {
  const response = await axiosClient.get<T>(endpoint);
  return response.data;
};

export const getHomePage = (): Promise<HomePageResponse> =>
  fetchApi<HomePageResponse>(API_ENDPOINTS.HOME_PAGE);

export const getFeedPage = (): Promise<FeedPageResponse> =>
  fetchApi<FeedPageResponse>(API_ENDPOINTS.FEED_PAGE);

export const apis = {
  getHomePage,
  getFeedPage,
} as const;


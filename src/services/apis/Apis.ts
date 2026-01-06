import {axiosClient} from './AxiosClient';
import {API_ENDPOINTS} from '../constants/common';
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

export const getFeedPage = (page: number = 1): Promise<FeedPageResponse> =>
  fetchApi<FeedPageResponse>(`${API_ENDPOINTS.FEED_PAGE}?page=${page}`);

export const apis = {
  getHomePage,
  getFeedPage,
} as const;


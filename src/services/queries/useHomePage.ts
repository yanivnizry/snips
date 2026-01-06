import {useQuery} from '@tanstack/react-query';
import {getHomePage} from '../apis/Apis';
import type {HomePageResponse} from '../types/ApiTypes';

export const useHomePage = () => {
  return useQuery<HomePageResponse>({
    queryKey: ['homePage'],
    queryFn: getHomePage,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 3,
  });
};


import {useQuery} from '@tanstack/react-query';
import {getHomePage} from '../apis/Apis';
import type {HomePageResponse} from '../types/ApiTypes';

export const useHomePage = () => {
  return useQuery<HomePageResponse>({
    queryKey: ['homePage'],
    queryFn: getHomePage,
  });
};


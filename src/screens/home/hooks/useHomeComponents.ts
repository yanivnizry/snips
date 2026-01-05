import {useMemo} from 'react';
import type {HomePageResponse, Component} from '@/services/types/ApiTypes';

interface UseHomeComponentsResult {
  readonly featuredList: Component | null;
  readonly categoryList: readonly Component[];
  readonly moreList: Component | null;
}

export const useHomeComponents = (data: HomePageResponse | undefined): UseHomeComponentsResult => {
  return useMemo(() => {
    if (!data?.data?.components) {
      return {
        featuredList: null,
        categoryList: [],
        moreList: null,
      };
    }

    const components = data.data.components;
    const featuredList = components.find(c => c.componentType === 'LARGE_COVERS');
    const categoryList = components.filter(c => c.componentType === 'REGULAR_COVERS');
    const moreList = components.find(c => c.componentType === 'MORE_TITLES');

    return {
      featuredList: featuredList || null,
      categoryList: categoryList || [],
      moreList: moreList || null,
    };
  }, [data]);
};


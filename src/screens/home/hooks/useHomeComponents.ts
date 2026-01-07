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
    let featuredList: Component | null = null;
    const categoryList: Component[] = [];
    let moreList: Component | null = null;

    for (const component of components) {
      switch (component.componentType) {
        case 'LARGE_COVERS':
          featuredList = component;
          break;
        case 'REGULAR_COVERS':
          categoryList.push(component);
          break;
        case 'MORE_TITLES':
          moreList = component;
          break;
      }
    }

    return {
      featuredList,
      categoryList,
      moreList
    };
  }, [data]);
};


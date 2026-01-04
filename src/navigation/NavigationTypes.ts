export type RootTabParamList = {
  Home: undefined;
  ForYou: undefined;
  Rewards: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}



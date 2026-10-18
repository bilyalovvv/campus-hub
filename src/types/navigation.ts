export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Settings: undefined; 
    Details: {
      serviceId: string;
      title: string;
    };
};

export type MainTabParamList = {
    Home: undefined;
    Services: undefined;
    Profile: undefined;
    Settings: undefined;
};

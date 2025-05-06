import "dotenv/config";

export default () => {
  return {
    expo: {
      name: "Free Glu",
      slug: "TFG",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "myapp",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.sergiolarriba.freeGlu",
        config: {
          googleMapsApiKey: process.env.API_MAPS_IOS_DEVELOPMENT,
        },
        icon: "./assets/icons/ios-light.png",
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/icons/adaptive-icon.png",
          backgroundColor: "#00FE87",
        },
        config: {
          googleMaps: {
            apiKey: process.env.API_MAPS_ANDROID_PRODUCTION,
          },
        },
        permissions: [
          "android.permission.ACCESS_COARSE_LOCATION",
          "android.permission.ACCESS_FINE_LOCATION",
        ],
        package: "com.sergiolarriba.freeGlu",
        versionCode: 1,
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        [
          "expo-location",
          {
            locationAlwaysAndWhenInUsePermission:
              "Allow $(PRODUCT_NAME) to use your location.",
          },
        ],
        "expo-localization",
        [
          "expo-splash-screen",
          {
            image: "./assets/icons/Design.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#121927",
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
      },
      extra: {
        eas: {
          projectId: "f9a07cf9-1430-4f49-b3c2-57c13a7582a6",
        },
        API_MAPS_ANDROID_DEVELOPMENT: process.env.API_MAPS_ANDROID_PRODUCTION, 
        EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
        EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
        router: {
          origin: false,
        },
      },
      owner: "sergiolarriba",
    },
  };
};

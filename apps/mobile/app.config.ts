import { ConfigContext, ExpoConfig } from "expo/config";

// App configuration
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "org.impenetrable.connect.dev";
  }

  if (IS_PREVIEW) {
    return "org.impenetrable.connect.preview";
  }

  return "org.impenetrable.connect";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Impenetrable Connect (Dev)";
  }

  if (IS_PREVIEW) {
    return "Impenetrable Connect (Preview)";
  }

  return "Impenetrable Connect";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "impenetrable-connect",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "impenetrable-connect",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#fcf9f2", // Uses surface color from design system
  },
  plugins: [
    "expo-localization",
    [
      "expo-router",
      {
        headers: {
          // EXPLANATION OF CACHE-CONTROL "no-cache":
          // The EAS Hosting default is a 1-hour cache which causes stale web deployments.
          // Using "no-cache" is the optimal middle-ground for SPAs:
          // It DOES allow the browser to cache the file locally, but STRICTLY REQUIRES
          // the browser to validate with the server (via ETag) before using it.
          // - If no new deploy was made -> Server returns HTTP 304, browser loads from cache instantly.
          // - If a new deploy was made -> Server returns HTTP 200, browser downloads the fresh file.
          // This guarantees users never see a stale index.html without sacrificing load speed.
          "Cache-Control": "no-cache",
        },
      },
    ],
    "@react-native-community/datetimepicker",
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#fcf9f2",
    },
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  extra: {
    router: {},
    eas: {
      projectId: "430a65eb-19e4-4158-9822-475364cb6664",
    },
  },
  owner: "masch",
});

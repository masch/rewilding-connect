import { getDefaultConfig } from "@expo/metro-config";
import { withNativeWind } from "nativewind/dist/metro/index.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = getDefaultConfig(__dirname);

export default withNativeWind(config, { input: resolve(__dirname, "./global.css") });

import { Stack } from "expo-router";
import { DEFAULT_SCREEN_OPTIONS } from "../constants/nav.constants";
import "../../global.css"

export default function RootLayout() {
  return <Stack screenOptions={DEFAULT_SCREEN_OPTIONS} />;
}

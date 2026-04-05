import { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { DEFAULT_SCREEN_OPTIONS } from "../constants/nav.constants";
import { useLocale } from "../hooks/useI18n";
import "../../global.css";

function LocaleInitializer() {
  const { initializeLocale } = useLocale();

  useEffect(() => {
    initializeLocale();
  }, [initializeLocale]);

  return null;
}

export default function RootLayout() {
  return (
    <>
      <LocaleInitializer />
      <View className="flex-1 bg-surface">
        <Stack screenOptions={DEFAULT_SCREEN_OPTIONS} />
      </View>
    </>
  );
}

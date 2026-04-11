import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslations } from "../../hooks/useI18n";

export default function AdminTabsLayout() {
  const { t } = useTranslations();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "primary",
        tabBarInactiveTintColor: "tab-inactive",
        tabBarStyle: { backgroundColor: "surface" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: "/admin",
          title: t("tabs.roles"),
          tabBarLabel: t("tabs.roles"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          href: "/admin/project",
          title: t("tabs.projects"),
          tabBarLabel: t("tabs.projects"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="common/profile"
        options={{
          href: "/admin/common/profile",
          title: t("tabs.profile"),
          tabBarLabel: t("tabs.profile"),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

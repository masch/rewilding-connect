import { useAuthStore } from "../stores/auth.store";
import { View, Text, ScrollView } from "react-native";
import Screen, { ScreenContent } from "../components/Screen";
import { router } from "expo-router";
import { COLORS, UserRole, type User } from "@repo/shared";
import { getDemoUsersByRole } from "../mocks/users";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslations } from "../hooks/useI18n";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

import { Button } from "../components/Button";
import { formatUserDisplayName } from "../logic/formatters";
import env from "../config/env";
import { logger } from "../services/logger.service";

// Role colors from design system - mapped for icons and backgrounds
const ROLE_COLORS = {
  [UserRole.TOURIST]: {
    icon: COLORS["tertiary-container"],
    bgClass: "bg-tertiary-container",
    accentClass: "bg-tertiary-container/10",
    borderClass: "border-tertiary-container/30",
    textClass: "text-tertiary-container",
  },
  [UserRole.ENTREPRENEUR]: {
    icon: COLORS.primary,
    bgClass: "bg-primary",
    accentClass: "bg-primary/10",
    borderClass: "border-primary/30",
    textClass: "text-primary",
  },
  [UserRole.ADMIN]: {
    icon: COLORS.secondary,
    bgClass: "bg-secondary",
    accentClass: "bg-secondary/10",
    borderClass: "border-secondary/30",
    textClass: "text-secondary",
  },
} as const;

const ROLE_CONFIG = {
  [UserRole.TOURIST]: {
    icon: "hiking",
    color: ROLE_COLORS[UserRole.TOURIST].icon,
    bgClass: ROLE_COLORS[UserRole.TOURIST].bgClass,
    accentClass: ROLE_COLORS[UserRole.TOURIST].accentClass,
    borderClass: ROLE_COLORS[UserRole.TOURIST].borderClass,
    textClass: ROLE_COLORS[UserRole.TOURIST].textClass,
  },
  [UserRole.ENTREPRENEUR]: {
    icon: "store",
    color: ROLE_COLORS[UserRole.ENTREPRENEUR].icon,
    bgClass: ROLE_COLORS[UserRole.ENTREPRENEUR].bgClass,
    accentClass: ROLE_COLORS[UserRole.ENTREPRENEUR].accentClass,
    borderClass: ROLE_COLORS[UserRole.ENTREPRENEUR].borderClass,
    textClass: ROLE_COLORS[UserRole.ENTREPRENEUR].textClass,
  },
  [UserRole.ADMIN]: {
    icon: "shield-account",
    color: ROLE_COLORS[UserRole.ADMIN].icon,
    bgClass: ROLE_COLORS[UserRole.ADMIN].bgClass,
    accentClass: ROLE_COLORS[UserRole.ADMIN].accentClass,
    borderClass: ROLE_COLORS[UserRole.ADMIN].borderClass,
    textClass: ROLE_COLORS[UserRole.ADMIN].textClass,
  },
} as const;

export default function RoleSelectorScreen() {
  logger.debug("env.USE_MOCKS", { value: env.USE_MOCKS });
  logger.debug("EXPO_PUBLIC_USE_MOCKS", { value: process.env.EXPO_PUBLIC_USE_MOCKS });
  const { setUserRole } = useAuthStore();
  const login = useAuthStore((state) => state.login);

  const getUserIdentifier = (user: User, role: UserRole): string => {
    if (role === UserRole.TOURIST) {
      return user.alias || user.firstName || "Tourist";
    }
    return user.email || "";
  };

  const handleDemoLogin = async (user: User) => {
    const role = user.role;
    const isTourist = role === "TOURIST";

    try {
      if (isTourist) {
        await login({ alias: user.alias! });
      } else {
        await login({ email: user.email!, password: "password123" });
      }

      setUserRole(role);

      if (role === UserRole.TOURIST) {
        router.replace("/tourist");
      } else if (role === UserRole.ENTREPRENEUR) {
        router.replace("/entrepreneur/agenda");
      } else if (role === UserRole.ADMIN) {
        router.replace("/admin/project");
      }
    } catch (error) {
      logger.error("Demo login failed", error);
    }
  };

  const handleTouristSignUp = () => {
    setUserRole(UserRole.TOURIST);
    router.push("/tourist/login");
  };

  const demoUsersByRole = [
    { role: UserRole.TOURIST, users: env.USE_MOCKS ? getDemoUsersByRole(UserRole.TOURIST) : [] },
    {
      role: UserRole.ENTREPRENEUR,
      users: env.USE_MOCKS ? getDemoUsersByRole(UserRole.ENTREPRENEUR) : [],
    },
    { role: UserRole.ADMIN, users: env.USE_MOCKS ? getDemoUsersByRole(UserRole.ADMIN) : [] },
  ] as const;

  const { t } = useTranslations();

  return (
    <Screen>
      <ScreenContent>
        <View className="flex-row justify-end mb-4">
          <LanguageSwitcher />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-display font-bold text-on-surface mb-2">
            {t("role_selector.welcome")}
          </Text>
          <Text className="text-base text-on-surface opacity-60 mb-8">
            {t("role_selector.subtitle")}
          </Text>

          {demoUsersByRole.map((group) => {
            const config = ROLE_CONFIG[group.role];
            const label = t(`role_selector.roles.${group.role}.label`);
            const description = t(`role_selector.roles.${group.role}.description`);
            return (
              <View key={group.role} className="mb-6">
                {/* Role Header - Prominent styling */}
                <View
                  className={`flex-row items-center gap-3 p-3 rounded-lg ${config.accentClass} mb-3`}
                >
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center ${config.bgClass}`}
                  >
                    <MaterialCommunityIcons
                      name={config.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                      size={24}
                      color="on-primary"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-display font-bold text-on-surface">{label}</Text>
                    <Text className="text-xs text-on-surface opacity-60">{description}</Text>
                  </View>
                </View>

                {/* Create Identity Button - Only for Tourists */}
                {group.role === UserRole.TOURIST && (
                  <Button
                    variant="outline"
                    onPress={handleTouristSignUp}
                    leftIcon="plus-circle-outline"
                    title={t("role_selector.create_identity")}
                    subtitle={t("role_selector.register_as_tourist")}
                    className="mb-3"
                  />
                )}

                {/* Real Login Button - For Entrepreneur and Admin in Real Mode */}
                {!env.USE_MOCKS &&
                  (group.role === UserRole.ENTREPRENEUR || group.role === UserRole.ADMIN) && (
                    <Button
                      variant="primary"
                      onPress={() => {
                        setUserRole(group.role);
                        router.push("/auth/login");
                      }}
                      leftIcon="login"
                      title={t("common.login")}
                      className="mb-3"
                    />
                  )}

                {/* Demo Users Grid */}
                {env.USE_MOCKS && (
                  <View className="flex flex-row flex-wrap gap-2">
                    {group.users.map((user) => {
                      const identifier = getUserIdentifier(user, group.role);
                      const displayName = formatUserDisplayName(identifier);

                      return (
                        <Button
                          key={user.id}
                          variant="secondary"
                          onPress={() => handleDemoLogin(user)}
                          leftIcon="account-outline"
                          title={displayName}
                          className={`flex-1 min-w-[45%] border ${config.borderClass} bg-surface-container-low px-3 py-2.5 rounded-lg`}
                        />
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </ScreenContent>
    </Screen>
  );
}

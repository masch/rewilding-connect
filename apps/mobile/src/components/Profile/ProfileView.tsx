import { UserRole, COLORS } from "@repo/shared";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Screen, { ScreenContent } from "../Screen";
import { Button } from "../Button";
import { useTranslations } from "../../hooks/useI18n";

interface ProfileViewProps {
  userType: UserRole;
}

/**
 * Shared Profile View component.
 * Uses role-based context and shared monorepo types.
 */
export default function ProfileView({ userType }: ProfileViewProps) {
  const { t } = useTranslations();
  const router = useRouter();

  return (
    <Screen>
      <ScreenContent className="p-4">
        <Text className="text-2xl font-bold mb-6">Profile - {userType}</Text>

        {userType === UserRole.ADMIN && (
          <Button
            onPress={() => router.push("/system-status")}
            variant="ghost"
            className="flex-row items-center p-4 bg-surface-variant rounded-xl border border-outline/20 mb-4"
          >
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-4">
              <MaterialCommunityIcons name="pulse" size={24} color={COLORS.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-on-surface-variant">{t("status.title")}</Text>
              <Text className="text-sm text-on-surface-variant/60">
                {t("status.services")} & {t("status.pipelines")}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLORS["on-surface-variant"]}
            />
          </Button>
        )}
      </ScreenContent>
    </Screen>
  );
}

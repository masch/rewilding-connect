import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslations } from "../hooks/useI18n";
import { useProjectStore } from "../stores/project.store";
import { VentureService } from "../services/venture.service";
import { Venture, COLORS } from "@repo/shared";
import { Button } from "./Button";
import { logger } from "../services/logger.service";
import LoadingView from "./LoadingView";

interface VentureCapacitySectionProps {
  userId: string;
}

export default function VentureCapacitySection({ userId }: VentureCapacitySectionProps) {
  const { t } = useTranslations();
  const { selectedProject, projects, setSelectedProject } = useProjectStore();

  const [venture, setVenture] = useState<Venture | null>(null);
  const [capacity, setCapacity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await VentureService.getVentureByUserId(userId);
        if (data) {
          setVenture(data);
          setCapacity(data.zzz_max_capacity);

          if (
            data.zzz_project_id &&
            (!selectedProject || selectedProject.zzz_id !== data.zzz_project_id)
          ) {
            const project = projects.find((p) => p.zzz_id === data.zzz_project_id);
            if (project) {
              setSelectedProject(project);
            }
          }
        }
      } catch (error) {
        logger.error("Error loading venture capacity:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [userId, projects, selectedProject, setSelectedProject]);

  const handleSave = async () => {
    if (!venture || isSaving) return;
    setIsSaving(true);
    try {
      await VentureService.updateVenture(venture.id, {
        zzz_max_capacity: capacity,
      });
      setVenture({ ...venture, zzz_max_capacity: capacity });
    } catch (error) {
      logger.error("Error saving capacity:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingView />;
  }

  if (!venture) {
    return (
      <View className="bg-surface-container-low rounded-3xl p-5 mb-4 border border-outline-variant/30">
        <Text className="text-on-surface-variant font-body italic text-center">
          {t("errors.no_venture_found")}
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-surface-container-low rounded-3xl border border-outline-variant/30 p-5 shadow-sm mb-4">
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mr-3">
          <MaterialCommunityIcons
            name="account-group-outline"
            size={24}
            color={COLORS.primary}
            accessibilityLabel={t("venture.capacity_label")}
          />
        </View>
        <Text className="text-lg font-display font-bold text-on-surface">
          {t("venture.capacity_label")}
        </Text>
      </View>

      <View className="flex-row items-center justify-between bg-surface-container-highest/30 p-4 rounded-2xl mb-4">
        <Button
          variant="outline"
          onPress={() => setCapacity(Math.max(1, capacity - 1))}
          className="w-12 h-12 rounded-xl border-outline-variant/50"
          disabled={capacity <= 1 || isSaving}
          testID="minus-button"
        >
          <MaterialCommunityIcons
            name="minus"
            size={24}
            color={COLORS.primary}
            accessibilityLabel={t("venture.minus")}
          />
        </Button>

        <View className="items-center">
          <View className="flex-row items-center mb-1 opacity-40">
            <Text className="text-[8px] font-body uppercase tracking-widest text-on-surface-variant">
              {t("venture.current_value")}:{" "}
            </Text>
            <Text className="text-[10px] font-display font-bold text-on-surface-variant">
              {venture.zzz_max_capacity}
            </Text>
          </View>

          <Text testID="capacity-text" className="text-3xl font-display font-bold text-on-surface">
            {capacity}
          </Text>
          <Text className="text-[10px] font-body text-on-surface-variant/60 uppercase tracking-widest">
            {t("common.pax")}
          </Text>
        </View>

        <Button
          variant="outline"
          onPress={() => setCapacity(capacity + 1)}
          className="w-12 h-12 rounded-xl border-outline-variant/50"
          disabled={capacity >= 999 || isSaving}
          testID="plus-button"
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={COLORS.primary}
            accessibilityLabel={t("venture.plus")}
          />
        </Button>
      </View>

      <Text className="text-[11px] font-body text-on-surface-variant/70 text-center px-4 mb-6 italic">
        {t("venture.capacity_legend")}
      </Text>

      <Button
        onPress={handleSave}
        disabled={capacity === (venture?.zzz_max_capacity || 0) || isSaving}
        className="rounded-2xl"
        isLoading={isSaving}
      >
        <Text className="text-on-primary font-bold">{t("common.save")}</Text>
      </Button>
    </View>
  );
}

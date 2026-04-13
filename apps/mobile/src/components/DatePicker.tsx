/**
 * DatePicker Component
 * A wrapper around @react-native-community/datetimepicker with NativeWind styling
 */

import { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const isWeb = Platform.OS === "web";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DatePicker({ value, onChange, minimumDate, maximumDate }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const handleQuickSelect = (daysFromNow: number) => {
    const targetDate = new Date();
    targetDate.setHours(12, 0, 0, 0);
    targetDate.setDate(targetDate.getDate() + daysFromNow);
    onChange(targetDate);
  };

  const isToday = (): boolean => {
    const today = new Date();
    const valueCheck = new Date(value);
    return (
      valueCheck.getDate() === today.getDate() &&
      valueCheck.getMonth() === today.getMonth() &&
      valueCheck.getFullYear() === today.getFullYear()
    );
  };

  const isTomorrow = (): boolean => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const valueCheck = new Date(value);
    return (
      valueCheck.getDate() === tomorrow.getDate() &&
      valueCheck.getMonth() === tomorrow.getMonth() &&
      valueCheck.getFullYear() === tomorrow.getFullYear()
    );
  };

  const [webPickerOpen, setWebPickerOpen] = useState(false);

  const adjustDate = (days: number) => {
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(12, 0, 0, 0);
    onChange(newDate);
  };

  const handleWebQuickSelect = (offset: number) => {
    handleQuickSelect(offset);
  };

  if (isWeb) {
    return (
      <View>
        <View className="flex-row gap-2 mb-3">
          <Pressable
            className={`py-2 px-4 border ${
              isToday()
                ? "bg-secondary border-secondary"
                : "bg-surface-container-low border-outline-variant"
            }`}
            onPress={() => handleWebQuickSelect(0)}
          >
            <Text
              className={`text-sm font-body ${isToday() ? "text-on-primary" : "text-on-surface"}`}
            >
              Hoy
            </Text>
          </Pressable>
          <Pressable
            className={`py-2 px-4 border ${
              isTomorrow()
                ? "bg-secondary border-secondary"
                : "bg-surface-container-low border-outline-variant"
            }`}
            onPress={() => handleWebQuickSelect(1)}
          >
            <Text
              className={`text-sm font-body ${isTomorrow() ? "text-on-primary" : "text-on-surface"}`}
            >
              Mañana
            </Text>
          </Pressable>
          <Pressable
            className="py-2 px-4 border bg-surface-container-low border-outline-variant"
            onPress={() => setWebPickerOpen(!webPickerOpen)}
          >
            <View className="flex-row items-center gap-1">
              <MaterialCommunityIcons name="calendar" size={16} color="on-surface" />
              <Text className="text-sm font-body text-on-surface">Elegir</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          className="bg-surface-container-low border border-outline-variant p-3 flex-row items-center justify-between"
          onPress={() => setWebPickerOpen(!webPickerOpen)}
        >
          <Text className="text-base font-body text-on-surface">{formatDate(value)}</Text>
          <MaterialCommunityIcons
            name={webPickerOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="on-surface"
          />
        </Pressable>

        {webPickerOpen && (
          <View className="mt-2 bg-surface-container-low border border-outline-variant p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Pressable className="p-2" onPress={() => adjustDate(-1)}>
                <MaterialCommunityIcons name="chevron-left" size={24} color="on-surface" />
              </Pressable>
              <Text className="text-lg font-body font-bold text-on-surface">
                {formatDate(value)}
              </Text>
              <Pressable className="p-2" onPress={() => adjustDate(1)}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="on-surface" />
              </Pressable>
            </View>
            <View className="flex-row gap-2 justify-center">
              <Pressable className="py-2 px-4 bg-primary" onPress={() => setWebPickerOpen(false)}>
                <Text className="text-base font-body font-bold text-on-primary">Confirmar</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View>
      <View className="flex-row gap-2 mb-3">
        <Pressable
          className={`py-2 px-4 border ${
            isToday()
              ? "bg-secondary border-secondary"
              : "bg-surface-container-low border-outline-variant"
          }`}
          onPress={() => handleQuickSelect(0)}
        >
          <Text
            className={`text-sm font-body ${isToday() ? "text-on-primary" : "text-on-surface"}`}
          >
            Hoy
          </Text>
        </Pressable>
        <Pressable
          className={`py-2 px-4 border ${
            isTomorrow()
              ? "bg-secondary border-secondary"
              : "bg-surface-container-low border-outline-variant"
          }`}
          onPress={() => handleQuickSelect(1)}
        >
          <Text
            className={`text-sm font-body ${isTomorrow() ? "text-on-primary" : "text-on-surface"}`}
          >
            Mañana
          </Text>
        </Pressable>
        <Pressable
          className="py-2 px-4 border bg-surface-container-low border-outline-variant"
          onPress={() => setShowPicker(!showPicker)}
        >
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons name="calendar" size={16} color="on-surface" />
            <Text className="text-sm font-body text-on-surface">Elegir</Text>
          </View>
        </Pressable>
      </View>

      <Pressable
        className="bg-surface-container-low border border-outline-variant p-3 flex-row items-center justify-between"
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text className="text-base font-body text-on-surface">{formatDate(value)}</Text>
        <MaterialCommunityIcons
          name={showPicker ? "chevron-up" : "chevron-down"}
          size={20}
          color="on-surface"
        />
      </Pressable>

      {showPicker && (
        <View className="mt-2 items-center">
          <DateTimePicker
            value={value}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            locale="es-AR"
          />
          {Platform.OS === "ios" && (
            <Pressable className="mt-2 py-2 px-6 bg-primary" onPress={() => setShowPicker(false)}>
              <Text className="text-base font-body font-bold text-on-primary">Confirmar</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

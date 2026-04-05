import { Text, View, Pressable } from "react-native";

interface FormSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function FormSwitch({ label, value, onValueChange }: FormSwitchProps) {
  return (
    <View className="mb-3">
      <Text className="text-sm font-medium text-on-surface mb-2">{label}</Text>

      {/* Slider Container */}
      <View className="h-10 justify-center">
        {/* Track Background - smaller */}
        <View
          className={`h-8 w-1/2 ${value ? "bg-primary-container" : "bg-surface-container-low"}`}
        >
          {/* Thumb/Knob - moves based on value */}
          <View
            className={`absolute top-1 w-10 h-6 bg-surface-container-lowest ${value ? "right-1" : "left-1"}`}
          />
        </View>

        {/* Tap area overlay */}
        <Pressable className="absolute inset-0" onPress={() => onValueChange(!value)} />
      </View>
    </View>
  );
}

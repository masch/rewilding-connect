import { Pressable, Text } from "react-native";

interface ButtonVariant {
  container: string;
  text: string;
  pressed: string;
}

interface ButtonProps {
  title: string;
  variant?: "primary" | "secondary" | "danger";
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
}

// Section 5: Sharp, angular (0 border-radius) - Section 6: Min touch targets 48x48dp, ideally 64dp+
// Primary button uses primary-container (#8c3d2b - terracotta) per design system
const variantStyles: Record<string, ButtonVariant> = {
  primary: {
    container: "bg-primary-container",
    text: "text-on-primary",
    pressed: "text-on-primary opacity-80",
  },
  secondary: {
    container: "bg-surface-container-highest",
    text: "text-on-surface",
    pressed: "text-on-surface opacity-70",
  },
  danger: {
    container: "bg-error-container",
    text: "text-on-error-container",
    pressed: "text-on-error-container opacity-80",
  },
};

export function Button({
  title,
  variant = "primary",
  onPress,
  disabled = false,
  icon,
}: ButtonProps) {
  const styles = variantStyles[variant];

  return (
    <Pressable
      className={`
        min-h-button rounded-none 
        items-center justify-center flex-row gap-2 
        ${styles.container}
        ${disabled ? "opacity-50" : ""}
      `}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <>
          {icon && <Text className="text-lg">{icon}</Text>}
          <Text
            className={`
              font-bold text-center 
              ${pressed ? styles.pressed : styles.text}
            `}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

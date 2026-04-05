import { Text, View, Modal, Pressable } from "react-native";
import { Button } from "./Button";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "primary";
  isLoading?: boolean;
}

export function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable className="flex-1 items-center justify-center p-5" onPress={onCancel}>
        {/* Glassmorphism overlay */}
        <View className="absolute inset-0 bg-surface/85 backdrop-blur-md" />

        <Pressable className="bg-surface-container-highest p-6 w-full max-w-md" onPress={() => {}}>
          <Text className="text-xl font-bold text-on-surface mb-2">{title}</Text>
          <Text className="text-base text-on-surface opacity-70 mb-6">{message}</Text>

          <View className="gap-4">
            <Button
              title={confirmText}
              variant={variant}
              onPress={onConfirm}
              disabled={isLoading}
            />
            <Button
              title={cancelText}
              variant="secondary"
              onPress={onCancel}
              disabled={isLoading}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

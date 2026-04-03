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
      <Pressable className="flex-1 bg-black/50 items-center justify-center" onPress={onCancel}>
        <Pressable className="bg-white rounded-2xl p-6 w-80 shadow-xl" onPress={() => {}}>
          <Text className="text-xl font-bold text-gray-900 mb-2">{title}</Text>
          <Text className="text-gray-600 mb-6">{message}</Text>

          <View className="gap-3">
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

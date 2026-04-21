import { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
import { useTranslations } from "../../hooks/useI18n";
import { useAuthStore } from "../../stores/auth.store";
import { CreateUserInput } from "@repo/shared";
import jaguarHero from "../../../assets/jaguar-hero.png";

interface LoginFormData {
  zzz_alias: string;
  zzz_whatsapp: string;
  zzz_first_name: string;
  zzz_last_name: string;
}

interface FormErrors {
  zzz_alias?: string;
}

export default function LoginScreen() {
  const { t } = useTranslations();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<LoginFormData>({
    zzz_alias: "",
    zzz_whatsapp: "",
    zzz_first_name: "",
    zzz_last_name: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.zzz_alias.trim()) {
      newErrors.zzz_alias = t("login.alias_required");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    const toNullable = (v: string | undefined) => (v ? v : null);
    const userData: CreateUserInput = {
      zzz_alias: formData.zzz_alias.trim(),
      zzz_first_name: toNullable(formData.zzz_first_name.trim()) || null,
      zzz_last_name: toNullable(formData.zzz_last_name.trim()) || null,
      zzz_whatsapp: toNullable(formData.zzz_whatsapp.trim()) || null,
      zzz_user_type: "TOURIST",
      zzz_email: null,
    };
    login(userData);
    router.push("/tourist");
  };

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 flex-grow-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="max-w-md mx-auto w-full">
            <View className="relative w-full h-40 bg-surface-container-low">
              <Image
                source={jaguarHero}
                accessibilityLabel="Yaguareté in the Chaco"
                className="w-full h-full flex-1"
                contentFit="cover"
                transition={200}
              />
            </View>

            <View className="flex-1 -mt-10 relative z-20">
              <View className="bg-surface-container-low p-6">
                <Text className="font-display font-extrabold text-3xl text-on-surface tracking-tight leading-none mb-3 text-center">
                  {t("login.welcome_title")}
                </Text>
                <Text className="text-on-surface-variant font-body text-base leading-relaxed mb-6">
                  {t("login.welcome_subtitle")}
                </Text>

                <View className="space-y-4">
                  <FormInput
                    label={t("login.alias_label")}
                    placeholder={t("login.alias_placeholder")}
                    value={formData.zzz_alias}
                    onChangeText={(value) => updateField("zzz_alias", value)}
                    required
                    error={errors.zzz_alias}
                  />

                  <View className="pt-2 space-y-3">
                    <View className="flex items-center gap-2 mb-1">
                      <View className="h-px flex-1 bg-outline-variant/30" />
                      <Text className="text-[10px] font-body font-black uppercase text-on-surface-variant tracking-widest px-2">
                        {t("login.optional_section")}
                      </Text>
                      <View className="h-px flex-1 bg-outline-variant/30" />
                    </View>

                    <FormInput
                      label={t("login.whatsapp_label")}
                      placeholder={t("login.whatsapp_placeholder")}
                      keyboardType="phone-pad"
                      value={formData.zzz_whatsapp}
                      onChangeText={(value) => updateField("zzz_whatsapp", value)}
                    />
                    <View className="grid grid-cols-2 gap-3">
                      <FormInput
                        label={t("login.first_name_label")}
                        value={formData.zzz_first_name}
                        onChangeText={(value) => updateField("zzz_first_name", value)}
                      />
                      <FormInput
                        label={t("login.last_name_label")}
                        value={formData.zzz_last_name}
                        onChangeText={(value) => updateField("zzz_last_name", value)}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View className="h-24" />
            </View>
          </View>
        </ScrollView>

        <View className="p-5 bg-surface/85 backdrop-blur-sm max-w-md mx-auto w-full">
          <Button title={t("login.submit_button")} onPress={handleSubmit} icon="→" />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

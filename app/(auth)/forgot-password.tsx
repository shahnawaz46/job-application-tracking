import CustomStatusBar from "@/components/CustomStatusBar";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <CustomStatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerClassName="flex-1 items-center justify-center mt-safe"
      >
        <View className="w-full flex-1">
          <ForgotPasswordForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

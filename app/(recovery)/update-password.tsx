import CustomStatusBar from "@/components/CustomStatusBar";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdatePassword = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <CustomStatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerClassName="flex-1 items-center justify-center mt-safe"
      >
        <View className="w-full flex-1">
          <UpdatePasswordForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePassword;

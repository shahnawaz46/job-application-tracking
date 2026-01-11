import CustomStatusBar from "@/components/CustomStatusBar";
import SignUpForm from "@/components/forms/SignUpForm";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <CustomStatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1 items-center justify-center mt-safe"
        keyboardDismissMode="interactive"
      >
        <View className="w-full flex-1">
          <SignUpForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

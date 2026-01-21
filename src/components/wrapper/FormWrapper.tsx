import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// types/interface
import type { PropsWithChildren } from "react";

const FormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow items-center"
      >
        <View className="w-full flex-1 justify-center">{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormWrapper;

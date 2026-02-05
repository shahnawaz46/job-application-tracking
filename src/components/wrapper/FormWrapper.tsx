import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

// types/interface
import type { PropsWithChildren } from "react";

const FormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAwareScrollView
      bottomOffset={80}
      contentContainerClassName="flex-grow"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full flex-1 justify-center">{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default FormWrapper;

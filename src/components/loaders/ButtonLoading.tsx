import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const ButtonLoading = ({ text }: { text: string }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ActivityIndicator size="small" />
      <Text className="ml-2 text-white">{text}</Text>
    </View>
  );
};

export default ButtonLoading;

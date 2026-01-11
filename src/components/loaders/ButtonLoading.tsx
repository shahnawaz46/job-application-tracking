import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "../ui/text";

const ButtonLoading = ({ text }: { text: string }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ActivityIndicator size="small" />
      <Text className="ml-2">{text}</Text>
    </View>
  );
};

export default ButtonLoading;

import { cn } from "@/lib/utils";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "../ui/text";

interface IButtonLoadingProps {
  text: string;
  textClassName?: string;
}

const ButtonLoading = ({ text, textClassName }: IButtonLoadingProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ActivityIndicator size="small" className={cn(textClassName)} />
      <Text className={cn("ml-2", textClassName)}>{text}</Text>
    </View>
  );
};

export default ButtonLoading;

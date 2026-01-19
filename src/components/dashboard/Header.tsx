import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

const Header = ({ full_name }: { full_name: string }) => {
  return (
    <View className="mb-4">
      <Text variant={"large"} numberOfLines={1}>
        Welcome back, {full_name}
      </Text>

      <Text variant={"xs"} className="text-muted-foreground">
        Track and manage your job applications
      </Text>
    </View>
  );
};

export default Header;

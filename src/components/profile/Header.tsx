import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <View className="flex-row justify-between items-center">
      <Button
        variant={"outline"}
        size={"xs"}
        className="w-10 p-0"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back-outline" size={20} color="black" />
      </Button>
      <Text variant={"xl"} className="text-center">
        {title}
      </Text>

      <View className="w-10"></View>
    </View>
  );
};

export default Header;

import { getJoinedDate } from "@/utils/date";
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

interface IProfileInfoProps {
  full_name: string;
  email: string;
  joined: string;
}

const ProfileInfo = ({ full_name, email, joined }: IProfileInfoProps) => {
  return (
    <View className="items-center px-4 pb-6">
      {/* name */}
      <Text variant={"xl"} className="mt-2 text-center" numberOfLines={2}>
        {full_name}
      </Text>

      {/* email */}
      <Text className="text-gray-600 mt-1 text-center" numberOfLines={1}>
        {email}
      </Text>

      {/* joined date */}
      <Text
        variant={"xs"}
        className="text-gray-500 mt-1 text-center"
        numberOfLines={1}
      >
        Joined since {getJoinedDate(joined)}
      </Text>
    </View>
  );
};

export default ProfileInfo;

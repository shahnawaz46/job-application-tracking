// import { View, Text } from 'react-native'
import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

const stats = [
  { value: "2.5K", label: "Applied" },
  { value: "364", label: "Interview" },
  { value: "48", label: "Rejected" },
];

interface IStatsCardProps {
  value: string;
  label: string;
}

const StatsCard = ({ stats }: { stats: IStatsCardProps[] }) => {
  return (
    <View className="flex-row justify-around bg-white rounded-2xl p-4 mx-4 shadow-sm">
      {stats.map((stat, index) => (
        <View key={index} className="items-center">
          <Text className="text-2xl font-bold text-gray-900">{stat.value}</Text>
          <Text className="text-sm text-gray-500 mt-1">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default StatsCard;

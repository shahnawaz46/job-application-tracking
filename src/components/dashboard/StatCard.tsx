import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Text } from "../ui/text";

// types/interface
import type { ReactNode } from "react";

interface IStatCardProps {
  icon: ReactNode;
  label: string;
  value: number | undefined;
  bgColor: string;
}

const StatCard = ({ icon, label, value, bgColor }: IStatCardProps) => {
  return (
    <Card className="flex-1 gap-1 p-3">
      <CardHeader className="flex-row justify-between p-0">
        <CardTitle variant={"small"} className="font-normal">
          {label}
        </CardTitle>
        <View
          className={`w-7 h-7 ${bgColor} rounded-full items-center justify-center`}
        >
          {icon}
        </View>
      </CardHeader>

      <CardContent className="p-0">
        <Text variant={"xl"}>{value}</Text>
      </CardContent>
    </Card>
  );
};

export default StatCard;

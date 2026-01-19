import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

// types/interface
import type { ReactNode } from "react";

interface IStatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  bgColor: string;
  isLoading: boolean;
}

const StatCard = ({
  icon,
  label,
  value,
  bgColor,
  isLoading,
}: IStatCardProps) => {
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
        {isLoading ? (
          <Skeleton className="w-20 h-7" />
        ) : (
          <Text variant={"xl"}>{value}</Text>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;

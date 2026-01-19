import { View } from "react-native";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Text } from "../ui/text";

// types/interface
import type { ReactNode } from "react";

interface IAnalyticsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  bgColor?: string;
  bottomText: string;
}

const AnalyticsCard = ({
  icon,
  label,
  value,
  bgColor,
  bottomText,
}: IAnalyticsCardProps) => {
  return (
    <Card className="flex-1 gap-1 p-3">
      <CardHeader className="flex-row items-center p-0 gap-0">
        <View
          className={`w-7 h-7 ${bgColor} rounded-full items-center justify-center`}
        >
          {icon}
        </View>
        <CardTitle variant={"small"} className="font-normal">
          {label}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Text variant={"xl"}>{value}%</Text>
      </CardContent>
      <CardFooter className="p-0">
        <Text variant={"xs"} className="text-muted-foreground">
          {bottomText}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsCard;

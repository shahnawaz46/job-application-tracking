import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Text } from "../ui/text";

interface StateMessageProps {
  title?: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  cardClassName?: string;
}

const StateMessage = ({
  title,
  description,
  iconName = "alert-circle-outline",
  iconColor = "#9CA3AF",
  actionLabel,
  onActionPress,
  cardClassName,
}: StateMessageProps) => {
  return (
    <View className="flex-1 justify-center items-center px-4">
      <Card className={cn("items-center w-full max-w-md gap-3", cardClassName)}>
        <CardHeader className="px-3 items-center gap-3">
          <Ionicons name={iconName} size={64} color={iconColor} />

          <CardTitle variant="large" className="text-center">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {description ? (
            <CardDescription
              variant="small"
              className="text-center text-muted-foreground"
            >
              {description}
            </CardDescription>
          ) : null}
        </CardContent>

        {actionLabel && onActionPress ? (
          <CardFooter>
            <Button onPress={onActionPress}>
              <Text>{actionLabel}</Text>
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </View>
  );
};

export default StateMessage;

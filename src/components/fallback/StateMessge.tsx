import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Text } from "../ui/text";

interface StateMessageProps {
  title: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const StateMessage = ({
  title,
  description,
  iconName = "alert-circle-outline",
  iconColor = "#9CA3AF",
  actionLabel,
  onActionPress,
}: StateMessageProps) => {
  return (
    <View className="flex-1 justify-center items-center px-4">
      <Card className="items-center w-full max-w-md">
        <CardHeader className="px-3 items-center">
          <Ionicons name={iconName} size={64} color={iconColor} />

          <CardTitle variant="large" className="mt-2 text-center">
            {title}
          </CardTitle>

          {description ? (
            <CardDescription
              variant="small"
              className="text-center mt-2 text-muted-foreground"
            >
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>

        {actionLabel && onActionPress ? (
          <CardContent>
            <Button onPress={onActionPress}>
              <Text>{actionLabel}</Text>
            </Button>
          </CardContent>
        ) : null}
      </Card>
    </View>
  );
};

export default StateMessage;

import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

interface IWorkModeCard {
  onsite: number;
  hybrid: number;
  remote: number;
  isLoading: boolean;
}

const WorkModeCard = ({ onsite, hybrid, remote, isLoading }: IWorkModeCard) => {
  return (
    <Card className="p-3">
      <CardContent className="p-0">
        <View className="flex-row items-center mb-3 gap-3">
          <Ionicons name="desktop-outline" size={18} color="#3b82f6" />
          <Text variant={"small"} className="font-medium">
            Work Mode
          </Text>
        </View>
        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text variant={"small"} className="text-muted-foreground">
              Onsite
            </Text>
            {isLoading ? (
              <Skeleton className="w-20 h-4 rounded-sm" />
            ) : (
              <Text variant={"xs"} className="font-semibold text-foreground">
                {onsite}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between">
            <Text variant={"small"} className="text-muted-foreground">
              Hybrid
            </Text>
            {isLoading ? (
              <Skeleton className="w-20 h-4 rounded-sm" />
            ) : (
              <Text variant={"xs"} className="font-semibold text-foreground">
                {hybrid}
              </Text>
            )}
          </View>
          <View className="flex-row justify-between">
            <Text variant={"small"} className="text-muted-foreground">
              Remote
            </Text>
            {isLoading ? (
              <Skeleton className="w-20 h-4 rounded-sm" />
            ) : (
              <Text variant={"xs"} className="font-semibold text-foreground">
                {remote}
              </Text>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

export default WorkModeCard;

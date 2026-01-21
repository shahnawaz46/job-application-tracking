import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const NoApplication = () => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Card className="items-center">
        <CardHeader className="px-3 items-center">
          <Ionicons name="document-text-outline" size={64} color="#9CA3AF" />
          <CardTitle variant={"large"}>No Applications Yet</CardTitle>
          <CardDescription
            variant={"small"}
            className="text-center mt-2 text-muted-foreground"
          >
            Start tracking your job applications by adding your first entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onPress={() => router.navigate("/(tabs)/add-application")}>
            <Text>Add Application</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};

export default NoApplication;

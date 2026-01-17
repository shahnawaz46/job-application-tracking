import CustomStatusBar from "@/components/CustomStatusBar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = () => {
  return (
    <SafeAreaView className="bg-black flex-1" edges={["top"]}>
      <CustomStatusBar bgColor="black" style="light" />
      <Text className="text-green-300">DashboardScreen</Text>
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </SafeAreaView>
  );
};

export default DashboardScreen;

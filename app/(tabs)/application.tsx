import CustomStatusBar from "@/src/components/CustomStatusBar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Application = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "red", flex: 1 }}>
      <CustomStatusBar bgColor="red" style="light" />
      <Text>Application page</Text>
    </SafeAreaView>
  );
};

export default Application;

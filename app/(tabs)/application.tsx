import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const Application = () => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar backgroundColor="white" style="dark" />
      <Text>Application page</Text>
    </View>
  );
};

export default Application;

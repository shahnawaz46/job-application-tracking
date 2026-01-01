import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="black" style="auto" />
      <Text style={{ color: "white" }}>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

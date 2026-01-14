import { View } from "react-native";
import GoogleSignIn from "./GoogleSignIn";

export function SocialConnections() {
  return (
    <View className="flex-row gap-3 justify-center">
      <GoogleSignIn />
    </View>
  );
}

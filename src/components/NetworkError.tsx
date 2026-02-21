import useNetworkInfo from "@/hooks/useNetworkInfo";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import StateMessage from "./fallback/StateMessge";

const NetworkError = () => {
  const { isOnline } = useNetworkInfo();
  const top = useSharedValue(-50);

  useEffect(() => {
    if (isOnline) {
      top.value = withTiming(-50, { duration: 300 });
    } else {
      top.value = withTiming(50, { duration: 300 });
    }
  }, [isOnline]);

  const animatedStyle = useAnimatedStyle(() => ({
    top: top.value,
  }));

  return (
    <>
      {/* error message component */}
      {!isOnline && (
        <View className="bg-white absolute top-0 bottom-0 left-0 right-0 z-50">
          <StateMessage
            iconName={"cloud-offline-outline"}
            iconColor="#EF4444"
            title={"You're Offline"}
            description={
              "Looks like you lost your internet connection. Check your connection."
            }
            cardClassName="bg-transparent border-transparent shadow-none"
          />
        </View>
      )}

      {/* animated banner show at top */}
      <Animated.View
        style={[animatedStyle]}
        className={"absolute left-6 right-6 rounded-md bg-black py-3 z-50"}
      >
        <View className="flex-row items-center justify-center gap-2">
          <View className="w-2 h-2 rounded bg-red-500" />
          <Text className="text-white text-sm font-medium">
            No internet connection
          </Text>
        </View>
      </Animated.View>
    </>
  );
};

export default NetworkError;

import React, { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const PageLoading = () => {
  const spin = useSharedValue(0);
  const fade = useSharedValue(0);

  const dot1 = useSharedValue(1);
  const dot2 = useSharedValue(1);
  const dot3 = useSharedValue(1);

  useEffect(() => {
    // Spinner rotation
    spin.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false);

    // Fade in
    fade.value = withTiming(1, { duration: 500 });
  }, []);

  // Dot pulses
  useEffect(() => {
    dot1.value = withRepeat(withTiming(1.5, { duration: 600 }), -1, true);

    dot2.value = withDelay(
      200,
      withRepeat(withTiming(1.5, { duration: 600 }), -1, true)
    );

    dot3.value = withDelay(
      400,
      withRepeat(withTiming(1.5, { duration: 600 }), -1, true)
    );
  }, []);

  // Animated styles
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <Animated.View style={fadeStyle} className="items-center">
        {/* Spinner */}
        <Animated.View
          style={spinStyle}
          className="w-20 h-20 justify-center items-center mb-8"
        >
          <View className="absolute w-20 h-20 rounded-full border-[3px] border-transparent border-t-indigo-500 border-r-indigo-500" />
          <View className="w-14 h-14 rounded-full border-[3px] border-transparent border-b-violet-500 border-l-violet-500" />
        </Animated.View>

        {/* Loading Text */}
        <Text className="text-white text-2xl font-semibold tracking-wide mb-4">
          Loading
        </Text>

        {/* Animated Dots */}
        <View className="flex-row items-center justify-center mb-6">
          <Animated.View
            style={dot1Style}
            className="w-2 h-2 rounded-full bg-indigo-500 mx-1"
          />
          <Animated.View
            style={dot2Style}
            className="w-2 h-2 rounded-full bg-indigo-500 mx-1"
          />
          <Animated.View
            style={dot3Style}
            className="w-2 h-2 rounded-full bg-indigo-500 mx-1"
          />
        </View>

        {/* Subtext */}
        <Text
          className="text-gray-400 text-sm text-center"
          style={{ maxWidth: width * 0.7 }}
        >
          Please wait while we prepare everything
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default PageLoading;

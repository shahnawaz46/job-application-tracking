import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, type GestureResponderEvent } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TabBarIcons } from "./Constants";
import { IRoute } from "./TabBar";

interface ITabBarButton {
  routeName: IRoute["name"];
  routeParams?: object;
  isFocused: boolean;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent,
  ) => void;
  onLongPress: ((event: GestureResponderEvent) => void) | null;
  label: string;
}

const TabBarButton = ({
  routeName,
  routeParams,
  isFocused,
  onPress,
  onLongPress,
  label,
}: ITabBarButton) => {
  const { buildHref } = useLinkBuilder();

  const scale = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);
    const top = interpolate(scale.value, [0, 1], [2, 9]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return { opacity };
  });

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  return (
    <PlatformPressable
      href={buildHref(routeName, routeParams)}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.tabBarItem,
        isFocused && {
          backgroundColor: "#723FEB",
          padding: 0,
          height: 45,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Animated.View style={[animatedIconStyle]}>
        {TabBarIcons[routeName]({
          isFocused,
          color: isFocused ? "#FFF" : "#222",
        })}
      </Animated.View>
      <Animated.Text style={[styles.tabBarLabel, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    height: 52,
  },
  tabBarLabel: {
    fontSize: 11,
  },
});

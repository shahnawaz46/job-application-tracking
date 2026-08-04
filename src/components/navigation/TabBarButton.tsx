import {
  PlatformPressable,
  useLinkBuilder,
} from "expo-router/react-navigation";
import React, { useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { COLORS } from "../../theme/color";
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

  const scale = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      damping: 16,
      stiffness: 180,
      mass: 0.8,
    });
  }, [isFocused]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scale.value, [0, 1], [1, 1.04]),
      },
    ],
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scale.value, [0, 1], [0, -2]),
      },
    ],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [0, 1], [0.8, 1]),
    transform: [
      {
        translateY: interpolate(scale.value, [0, 1], [0, -1]),
      },
    ],
  }));

  return (
    <PlatformPressable
      href={buildHref(routeName, routeParams)}
      onPress={onPress}
      onLongPress={onLongPress}
      pressColor={COLORS.primarySoft}
      className="flex-1"
    >
      <Animated.View
        className="h-12 items-center justify-center gap-0.5 rounded-xl"
        style={[
          animatedContainerStyle,
          isFocused && {
            backgroundColor: COLORS.primarySoft,
          },
        ]}
      >
        <Animated.View style={animatedIconStyle}>
          {TabBarIcons[routeName]({
            isFocused,
            color: isFocused ? COLORS.primary : COLORS.foreground,
          })}
        </Animated.View>

        <Animated.Text
          numberOfLines={1}
          className="text-[11px]"
          style={[
            animatedLabelStyle,
            {
              color: isFocused ? COLORS.primary : COLORS.foreground,
              fontWeight: isFocused ? "700" : "500",
            },
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </PlatformPressable>
  );
};

export default TabBarButton;

/*
    expo-status-bar is global, not per-screen

    When you navigate:
        The last mounted <StatusBar /> wins
        When you go back, the previous screen does NOT automatically re-apply its status bar settings
        So Previous Screen doesn’t re-set Color because its <StatusBar /> is already mounted and doesn’t re-run

    You must set the status bar when the screen is focused, not just when it mounts
    Use useFocusEffect or useIsFocused
*/

import { useIsFocused } from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";

// types/interfaces
import type { StatusBarStyle } from "expo-status-bar";

interface ICustomStatusBarProps {
  style: StatusBarStyle;
}

const CustomStatusBar = ({ style }: ICustomStatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar style={style} />;
};

export default CustomStatusBar;

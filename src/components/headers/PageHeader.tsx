import { cn } from "@/lib/utils";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../CustomStatusBar";

// types/interface
import type { StatusBarStyle } from "expo-status-bar";
import type { PropsWithChildren } from "react";

interface IPageHeader extends PropsWithChildren {
  safeAreaViewClassName?: string;
  statusBarStyle?: StatusBarStyle;
}

const PageHeader = ({
  children,
  safeAreaViewClassName,
  statusBarStyle = "dark",
}: IPageHeader) => {
  return (
    <SafeAreaView
      edges={["top"]}
      className={cn("flex-1 bg-white", safeAreaViewClassName)}
    >
      <CustomStatusBar style={statusBarStyle} />
      {children}
    </SafeAreaView>
  );
};

export default PageHeader;

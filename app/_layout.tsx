import ToastSetup from "@/components/Toast";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import "./global.css";

function RootRoute() {
  const isAuthenticated: boolean = false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const theme = useColorScheme();

  return (
    <>
      <RootRoute />
      <PortalHost />
      <ToastSetup />
    </>
  );
}

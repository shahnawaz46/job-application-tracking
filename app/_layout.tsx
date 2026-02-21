import NetworkError from "@/components/NetworkError";
import SplashScreenController from "@/components/SplashScreenController";
import ToastSetup from "@/components/Toast";
import { useAuthContext } from "@/hooks/useAuthContext";
import AuthProvider from "@/providers/AuthProvider";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "./global.css";

function RootRoute() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(protected)" />
      </Stack.Protected>
    </Stack>
  );
}

{
  /* React Native doesn't support DOM portals. On native platforms, components like modals, and menus need a PortalHost  */
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <KeyboardProvider>
        <SplashScreenController />
        <NetworkError />
        <RootRoute />
        <ToastSetup />
        <PortalHost />
      </KeyboardProvider>
    </AuthProvider>
  );
}

import PageLoading from "@/components/loaders/PageLoading";
import SplashScreenController from "@/components/SplashScreenController";
import ToastSetup from "@/components/Toast";
import { useAuthContext } from "@/hooks/useAuthContext";
import AuthProvider from "@/providers/AuthProvider";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import "./global.css";

function RootRoute() {
  const { isAuthenticated, isLoading, isRecoveringPassword } = useAuthContext();

  // console.log("RootRoute", isLoading, isAuthenticated, isRecoveringPassword);
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* if user requested for Reset Password then only this 'Update Password' route will be accessible */}
      <Stack.Protected guard={isRecoveringPassword}>
        <Stack.Screen name="(recovery)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated && !isRecoveringPassword}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated && !isRecoveringPassword}>
        <Stack.Screen name="(tabs)" />
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
      <SplashScreenController />
      <RootRoute />
      <ToastSetup />
      <PortalHost />
    </AuthProvider>
  );
}

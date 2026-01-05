import PageLoading from "@/components/loaders/PageLoading";
import AuthProvider from "@/components/providers/AuthProvider";
import SplashScreenController from "@/components/SplashScreenController";
import ToastSetup from "@/components/Toast";
import { useAuthContext } from "@/hooks/useAuthContext";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import "./global.css";

function RootRoute() {
  const { isAuthenticated, isLoading } = useAuthContext();

  console.log("RootRoute", isLoading, isAuthenticated);
  if (isLoading) {
    return <PageLoading />;
  }

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
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootRoute />
      <ToastSetup />
      <PortalHost />
    </AuthProvider>
  );
}

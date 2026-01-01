import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import "./global.css";

function RootRoute() {
  const isAuthenticated: boolean = true;

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

  return <RootRoute />;
}

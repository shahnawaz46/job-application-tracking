import { Stack } from "expo-router";

const ProtectedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="update-password" />
    </Stack>
  );
};

export default ProtectedLayout;

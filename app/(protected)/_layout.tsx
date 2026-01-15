import { Stack } from "expo-router";

const ProtectedLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="edit-profile" />
    </Stack>
  );
};

export default ProtectedLayout;

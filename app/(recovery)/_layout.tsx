import { Stack } from "expo-router";

const RecoveryLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="update-password" />
    </Stack>
  );
};

export default RecoveryLayout;

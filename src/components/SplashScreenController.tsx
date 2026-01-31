import { useAuthContext } from "@/hooks/useAuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Do NOT hide the splash screen automatically (Expo automatically hides the splash screen)
// Keep the splash screen visible when the app starts
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

const SplashScreenController = () => {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    // If auth loading is finished, Hide the splash screen
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return null;
};

export default SplashScreenController;

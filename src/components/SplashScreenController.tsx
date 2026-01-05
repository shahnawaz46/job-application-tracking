import { useAuthContext } from "@/hooks/useAuthContext";
import * as SplashScreen from "expo-splash-screen";

// Do NOT hide the splash screen automatically (Expo automatically hides the splash screen)
// Keep the splash screen visible when the app starts
SplashScreen.preventAutoHideAsync();

const SplashScreenController = () => {
  const { isLoading } = useAuthContext();

  // If auth loading is finished, Hide the splash screen
  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
};

export default SplashScreenController;

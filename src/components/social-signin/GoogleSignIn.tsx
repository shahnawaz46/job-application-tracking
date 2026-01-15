import useAsyncAction from "@/hooks/useAsyncAction";
import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { Image } from "react-native";
import { ToastMessage } from "../Toast";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  scopes: ["email", "profile"],
  offlineAccess: false,
});

const GoogleSignIn = () => {
  const { isPending, execute } = useAsyncAction();
  const handleSignIn = () => {
    execute(async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        if (!userInfo?.data?.idToken) {
          ToastMessage({
            type: "error",
            text1: "Google sign-in failed, please try again",
          });
          return;
        }

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });

        if (error) {
          ToastMessage({
            type: "error",
            text1: error.message || "Login failed, please try again",
          });
        }

        ToastMessage({
          type: "success",
          text1: "Signed in successfully",
        });
      } catch (err) {
        ToastMessage({
          type: "error",
          text1: "Something went wrong, please try again",
        });
      }
    });
  };
  return (
    <Button
      variant="outline"
      className="flex-1"
      onPress={handleSignIn}
      disabled={isPending}
    >
      <Image
        className="size-4"
        source={{ uri: "https://img.clerk.com/static/google.png?width=160" }}
      />
      <Text>Continue with Google</Text>
    </Button>
  );
};

export default GoogleSignIn;

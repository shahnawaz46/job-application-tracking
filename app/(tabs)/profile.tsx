import CustomStatusBar from "@/components/CustomStatusBar";
import { ToastMessage } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      ToastMessage({ type: "error", text1: error.message });
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <CustomStatusBar style="dark" />
      <Text>Profile</Text>
      <Button className="full" variant={"destructive"} onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Profile;

import { logoutUser } from "@/api/user.api";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import AccountSection from "@/components/profile/AccountSection";
import Header from "@/components/profile/Header";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePic from "@/components/profile/ProfilePic";
import { ToastMessage } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import PageWrapper from "@/components/wrapper/PageWrapper";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";

const ProfileScreen = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutUserMutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      GoogleSignin.signOut();
      queryClient.clear();
    },
    onError: (error) => {
      ToastMessage({ type: "error", text1: error?.message });
    },
  });

  return (
    <PageWrapper safeAreaViewClassName="wrapper-space wrapper-space-x">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-14"
      >
        {/* Header */}
        <Header title="Profile" />

        {/* Proflie Picture */}
        <ProfilePic />

        {/* Profile Info */}
        <ProfileInfo />

        {/* Account Section */}
        <AccountSection />

        {/* Logout Button */}
        <View className="mt-6">
          <Button
            variant="outline"
            size="lg"
            className="border-red-200 bg-red-50"
            onPress={() => logoutUserMutate()}
            disabled={isPending}
          >
            {isPending ? (
              <ButtonLoading
                text="Signing out..."
                textClassName="text-danger"
              />
            ) : (
              <Text className="font-semibold text-danger">Log Out</Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </PageWrapper>
  );
};

export default ProfileScreen;

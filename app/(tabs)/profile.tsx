import PageHeader from "@/components/headers/PageHeader";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import AccountSection from "@/components/profile/AccountSection";
import Header from "@/components/profile/Header";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePic from "@/components/profile/ProfilePic";
import { ToastMessage } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import useAsyncAction from "@/hooks/useAsyncAction";
import { useAuthContext } from "@/hooks/useAuthContext";
import { invalidateQuery } from "@/hooks/useQuery";
import { supabase } from "@/lib/supabase";
import { ScrollView, View } from "react-native";

const ProfileScreen = () => {
  const { profile, isLoading } = useAuthContext();
  const { isPending, execute } = useAsyncAction();

  const handleLogout = () => {
    execute(async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        ToastMessage({ type: "error", text1: error?.message });
        return;
      }

      invalidateQuery("application-stats");
    });
  };

  return (
    <PageHeader safeAreaViewClassName="px-4 pt-3 pb-10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-white">
          {/* Header */}
          <Header title="Profile" />

          {/* Proflie Picture */}
          <ProfilePic
            full_name={profile.full_name}
            profile_pic={profile.profile_pic}
            isLoading={isLoading}
          />

          {/* Profile Info */}
          <ProfileInfo
            full_name={profile.full_name}
            email={profile.email}
            joined={profile.created_at}
            isLoading={isLoading}
          />
        </View>

        {/* separator */}
        <Separator />

        {/* Account Section */}
        <AccountSection />

        {/* Logout Button */}
        <View className="px-4 py-6">
          <Button
            size={"lg"}
            className="bg-red-50 active:bg-red-200 border border-red-200"
            onPress={handleLogout}
            disabled={isPending}
          >
            {isPending ? (
              <ButtonLoading
                text="Logging out..."
                textClassName="text-red-600"
              />
            ) : (
              <Text className="text-red-600 font-semibold">Log Out</Text>
            )}
          </Button>
        </View>

        <View className="h-8" />
      </ScrollView>
    </PageHeader>
  );
};

export default ProfileScreen;

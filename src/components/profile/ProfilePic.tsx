import { useProfile } from "@/hooks/useProfile";
import { getNameInitial } from "@/utils/text-transform";
import { Image, View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

const ProfilePic = () => {
  const { data: profile, isLoading } = useProfile();

  return (
    <View className="items-center pt-8">
      <View className="relative">
        {isLoading || !profile ? (
          <Skeleton className="h-24 w-24 rounded-full" />
        ) : profile.profile_pic ? (
          <Image
            source={{ uri: profile.profile_pic }}
            className="h-24 w-24 rounded-full"
          />
        ) : (
          <View className="h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <Text variant="xl" className="font-semibold uppercase text-primary">
              {getNameInitial(profile.full_name)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfilePic;

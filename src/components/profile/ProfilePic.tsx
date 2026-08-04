import { getNameInitial } from "@/utils/text-transform";
import { Image, View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

interface IProfilePicProps {
  full_name: string;
  profile_pic: string;
  isLoading: boolean;
}

const ProfilePic = ({
  profile_pic,
  full_name,
  isLoading,
}: IProfilePicProps) => {
  return (
    <View className="items-center pt-8">
      <View className="relative">
        {isLoading ? (
          <Skeleton className="h-24 w-24 rounded-full" />
        ) : profile_pic ? (
          <Image
            source={{ uri: profile_pic }}
            className="h-24 w-24 rounded-full"
          />
        ) : (
          <View className="h-24 w-24 items-center justify-center rounded-full bg-secondary">
            <Text variant="xl" className="font-semibold uppercase text-primary">
              {getNameInitial(full_name)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfilePic;

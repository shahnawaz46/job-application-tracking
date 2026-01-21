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
    <View className="relative items-center pt-6 mb-1">
      <View className="relative h-28 w-28">
        {profile_pic ? (
          isLoading ? (
            <Skeleton className="w-full h-full rounded-full" />
          ) : (
            <Image
              source={{ uri: profile_pic }}
              className="w-full h-full rounded-full"
            />
          )
        ) : isLoading ? (
          <Skeleton className="w-full h-full rounded-full" />
        ) : (
          <View className="w-full h-full rounded-full bg-gray-100 justify-center items-center">
            <Text variant={"large"} className="uppercase text-center">
              {getNameInitial(full_name)}
            </Text>
          </View>
        )}

        {/* <View className="absolute bottom-2 right-4">
          <Camera size={20} onPress={() => console.log("done")} />
        </View> */}
      </View>
    </View>
  );
};

export default ProfilePic;

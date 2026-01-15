import { getNameInitial } from "@/utils/getInitials";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "../ui/text";

interface IProfilePicProps {
  full_name: string;
  profile_pic: string;
}

const ProfilePic = ({ profile_pic, full_name }: IProfilePicProps) => {
  return (
    <View className="relative items-center pt-6">
      <View className="relative h-28 w-28">
        {profile_pic ? (
          <Image
            source={{ uri: profile_pic }}
            className="w-full h-full rounded-full border-4 border-white"
          />
        ) : (
          <View className="w-full h-full rounded-full border-4 border-white bg-gray-100 justify-center items-center">
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

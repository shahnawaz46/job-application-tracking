import { getJoinedDate } from "@/utils/date";
import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

interface IProfileInfoProps {
  full_name: string;
  email: string;
  joined: string;
  isLoading: boolean;
}

const ProfileInfo = ({
  full_name,
  email,
  joined,
  isLoading,
}: IProfileInfoProps) => {
  return (
    <View className="items-center px-4 pb-6">
      {/* name */}
      {isLoading ? (
        <Skeleton className="w-full h-7 mt-2" />
      ) : (
        <Text variant={"xl"} className="mt-2 text-center" numberOfLines={2}>
          {full_name}
        </Text>
      )}

      {/* email */}
      {isLoading ? (
        <Skeleton className="w-full h-6 mt-1" />
      ) : (
        <Text className="text-gray-600 mt-1 text-center" numberOfLines={1}>
          {email}
        </Text>
      )}

      {/* joined date */}
      {isLoading ? (
        <Skeleton className="w-full h-4 mt-1" />
      ) : (
        <Text
          variant={"xs"}
          className="text-gray-500 mt-1 text-center"
          numberOfLines={1}
        >
          Joined since {getJoinedDate(joined)}
        </Text>
      )}
    </View>
  );
};

export default ProfileInfo;

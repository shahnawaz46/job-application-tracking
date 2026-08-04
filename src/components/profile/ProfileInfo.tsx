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
        <Skeleton className="w-full h-8 mt-2" />
      ) : (
        <Text
          variant="xxl"
          className="mt-2 text-center font-semibold tracking-tight"
          numberOfLines={2}
        >
          {full_name}
        </Text>
      )}

      {/* email */}
      {isLoading ? (
        <Skeleton className="w-full h-6 mt-1" />
      ) : (
        <Text
          className="mt-1 text-center text-muted-foreground"
          numberOfLines={1}
        >
          {email}
        </Text>
      )}

      {/* joined date */}
      {isLoading ? (
        <Skeleton className="w-full h-4 mt-3" />
      ) : (
        <View className="mt-3 rounded-md bg-secondary px-3 py-2">
          <Text variant="xs" className="text-muted-foreground font-medium">
            Member since {getJoinedDate(joined)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileInfo;

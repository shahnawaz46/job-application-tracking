import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  return (
    <View className="flex-row justify-between items-center">
      <Button
        variant="secondary"
        size="icon"
        className="h-11 w-11"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={20} color="#475569" />
      </Button>

      <Text variant="xl" className="font-semibold">
        {title}
      </Text>

      <View className="h-11 w-11" />
    </View>
  );
};

export default Header;

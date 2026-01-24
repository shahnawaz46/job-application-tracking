import { View } from "react-native";
import { Text } from "../ui/text";

interface IHeaderProps {
  text: string;
  subText?: string;
}

const Header = ({ text, subText }: IHeaderProps) => {
  return (
    <View>
      <Text variant={"large"} numberOfLines={1}>
        {text}
      </Text>

      {subText && (
        <Text variant={"xs"} className="text-muted-foreground">
          {subText}
        </Text>
      )}
    </View>
  );
};

export default Header;

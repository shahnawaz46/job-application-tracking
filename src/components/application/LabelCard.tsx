import { cn } from "@/lib/utils";
import { textTransform } from "@/utils/text-transform";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";

// types/interface
import type { TextVariantProps } from "../ui/text";

interface ILabelCardProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  label: string;
  textVariant?: TextVariantProps["variant"];
  isTransform?: boolean;
  containerClassName?: string;
  textClassName?: string;
}

const LabelCard = ({
  iconName,
  iconColor,
  iconSize = 14,
  label,
  textVariant = "xs",
  isTransform = true,
  containerClassName,
  textClassName,
}: ILabelCardProps) => {
  return (
    <View
      className={cn("rounded-sm bg-secondary px-3 py-1.5", containerClassName)}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row items-center gap-1.5"
      >
        {iconName && (
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        )}
        <Text variant={textVariant} className={cn(textClassName)}>
          {isTransform ? textTransform(label) : label}
        </Text>
      </ScrollView>
    </View>
  );
};

export default LabelCard;

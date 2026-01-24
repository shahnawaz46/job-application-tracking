import { cn } from "@/lib/utils";
import { textTransform } from "@/utils/text-transform";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
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
  iconColor = "#6B7280",
  iconSize = 14,
  label,
  textVariant = "xs",
  isTransform = true,
  containerClassName,
  textClassName,
}: ILabelCardProps) => {
  return (
    <View
      className={cn(
        "flex-row items-center gap-1.5 bg-muted/80 px-3 py-1.5 rounded-md",
        containerClassName,
      )}
    >
      {iconName && (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}
      <Text variant={textVariant} className={cn("leading-none", textClassName)}>
        {isTransform ? textTransform(label) : label}
      </Text>
    </View>
  );
};

export default LabelCard;

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

interface IIconsProps {
  isFocused: boolean;
  color: string;
}

export const TabBarIcons = {
  index: ({ isFocused, color }: IIconsProps) => (
    <Octicons name={isFocused ? "home-fill" : "home"} size={18} color={color} />
  ),
  application: ({ isFocused, color }: IIconsProps) => (
    <MaterialCommunityIcons
      name={isFocused ? "application" : "application-outline"}
      size={18}
      color={color}
    />
  ),
  "add-application": ({ isFocused, color }: IIconsProps) => (
    <FontAwesome6 name={"add"} size={18} color={color} />
  ),
  profile: ({ isFocused, color }: IIconsProps) => (
    <FontAwesome5
      name={isFocused ? "user-alt" : "user"}
      size={18}
      color={color}
    />
  ),
};

export enum TabBarLabelTitle {
  "index" = "Dashboard",
  "application" = "Application",
  "add-application" = "Add",
  "profile" = "Profile",
}

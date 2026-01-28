import { lightHaptic } from "@/utils/haptics";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from "../ui/text";

// types/interface
import type { Href } from "expo-router";

const accountItems: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  showBadge?: boolean;
  route?: Href;
  hasPage?: boolean;
}[] = [
  {
    icon: "user",
    title: "Edit Profile",
    subtitle: "Update your info",
    route: "/(protected)/edit-profile",
    hasPage: true,
  },
  //   {
  //     icon: "bell",
  //     title: "Notifications",
  //     subtitle: "Manage alerts",
  //     showBadge: true,
  //   },
  //   {
  //     icon: "lock",
  //     title: "Privacy & Security",
  //     subtitle: "Control your data",
  //   },
  //   { icon: "settings", title: "Settings", subtitle: "App preferences" },
  //   {
  //     icon: "help-circle",
  //     title: "Help & Support",
  //     subtitle: "Get assistance",
  //   },
  {
    icon: "info",
    title: "About",
    subtitle: "App version 1.0.0",
    hasPage: false,
  },
];

const AccountSection = () => {
  const router = useRouter();
  return (
    <View className="mt-2">
      <View>
        {accountItems.map((item, index) => {
          const isClickable = item.hasPage;

          return (
            <Pressable
              key={index}
              disabled={!isClickable}
              android_ripple={isClickable ? { color: "rgba(0,0,0,0.1)" } : null}
              accessibilityRole={isClickable ? "button" : undefined}
              // className="bg-white"
              onPress={() => {
                if (!isClickable) return;
                lightHaptic();

                if (item.route) {
                  router.navigate(item.route);
                }
              }}
            >
              {({ pressed }) => (
                <View
                  className="flex-row items-center px-4 py-4 border-b border-gray-100"
                  style={{
                    opacity: isClickable && pressed ? 0.6 : 1,
                  }}
                >
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                    <Feather name={item.icon} size={20} color="#6B7280" />
                  </View>

                  <View className="flex-1 ml-4">
                    <Text className="font-semibold text-gray-900">
                      {item.title}
                    </Text>

                    {item.subtitle && (
                      <Text variant={"xs"} className="text-gray-500">
                        {item.subtitle}
                      </Text>
                    )}
                  </View>

                  {item?.showBadge && (
                    <View className="bg-red-500 w-5 h-5 rounded-full items-center justify-center mr-2">
                      <Text variant={"xs"} className="text-white font-bold">
                        3
                      </Text>
                    </View>
                  )}

                  {item.hasPage && (
                    <Feather name="chevron-right" size={20} color="#9CA3AF" />
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default AccountSection;

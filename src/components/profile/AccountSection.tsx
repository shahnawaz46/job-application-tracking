import { cn } from "@/lib/utils";
import { COLORS } from "@/theme/color";
import { lightHaptic } from "@/utils/haptics";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "../ui/text";

// types/interface
import type { Href } from "expo-router";

// getting app version from expo config and
// inside expo config getting version from package.json
const appVersion = Constants.expoConfig?.version;

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
    subtitle: "Manage your personal information",
    route: "/(protected)/edit-profile",
    hasPage: true,
  },
  {
    icon: "info",
    title: "About",
    subtitle: `Version ${appVersion || "1.0.0"}`,
    hasPage: false,
  },
];

const AccountSection = () => {
  const router = useRouter();

  return (
    <View className="mt-6">
      <Text
        variant="xs"
        className="px-2 pb-3 font-semibold uppercase tracking-widest text-muted-foreground"
      >
        Account
      </Text>

      {accountItems.map((item, index) => {
        const isClickable = item.hasPage;

        return (
          <Pressable
            key={index}
            disabled={!isClickable}
            android_ripple={
              isClickable
                ? {
                    color: COLORS.primary + 10,
                  }
                : undefined
            }
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
                className="flex-row items-center px-2 py-4"
                style={{
                  opacity: pressed ? 0.75 : 1,
                  borderBottomWidth:
                    index === accountItems.length - 1
                      ? 0
                      : StyleSheet.hairlineWidth,
                  borderBottomColor: COLORS.border,
                }}
              >
                <View
                  className={cn(
                    "h-11 w-11 items-center justify-center rounded-md",
                  )}
                  style={{ backgroundColor: COLORS.mutedForeground + 20 }}
                >
                  <Feather
                    name={item.icon}
                    size={19}
                    color={COLORS.mutedForeground}
                  />
                </View>

                <View className="ml-4 flex-1">
                  <Text className="font-semibold">{item.title}</Text>

                  <Text variant="xs" className="mt-1 text-muted-foreground">
                    {item.subtitle}
                  </Text>
                </View>

                {item.showBadge && (
                  <View className="mr-3 rounded-full bg-danger px-2 py-0.5">
                    <Text variant="xs" className="font-semibold text-white">
                      3
                    </Text>
                  </View>
                )}

                {item.hasPage && (
                  <Feather
                    name="chevron-right"
                    size={18}
                    color={COLORS.mutedForeground}
                  />
                )}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default AccountSection;

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useColorScheme } from "nativewind";
import { Image, Platform, View } from "react-native";

const SOCIAL_CONNECTION_STRATEGIES = [
  {
    type: "oauth_apple",
    source: { uri: "https://img.clerk.com/static/apple.png?width=160" },
    useTint: true,
  },
  {
    type: "oauth_google",
    source: { uri: "https://img.clerk.com/static/google.png?width=160" },
    useTint: false,
  },
  {
    type: "oauth_github",
    source: { uri: "https://img.clerk.com/static/github.png?width=160" },
    useTint: true,
  },
];

export function SocialConnections() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row gap-3 justify-center">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        return (
          <Button
            key={strategy.type}
            variant="outline"
            size="xs"
            className="flex-1"
            onPress={() => {
              // TODO: Authenticate with social provider and navigate to protected screen if successful
            }}
          >
            <Image
              className={cn(
                "size-4",
                strategy.useTint && Platform.select({ web: "dark:invert" })
              )}
              // tintColor={Platform.select({
              //   // native: colorScheme === "dark" ? "white" : "black",
              // })}
              source={strategy.source}
            />
          </Button>
        );
      })}
    </View>
  );
}

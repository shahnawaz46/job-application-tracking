import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarLabelTitle } from "./Constants";
import TabBarButton from "./TabBarButton";

// types/interface
interface ITabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export interface IRoute {
  key: string;
  name: "index" | "application" | "add-application" | "profile";
  params: object | undefined;
}

const TabBar = ({ state, descriptors, navigation }: ITabBarProps) => {
  const inset = useSafeAreaInsets();

  return (
    <View
      className="absolute left-4 right-4 h-16 flex-row items-center justify-between gap-2 rounded-lg border border-border bg-card px-2 py-2"
      style={{
        bottom: inset.bottom + 10,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,

        elevation: 1,
      }}
    >
      {state.routes.map((route: IRoute, index: number) => {
        const { options } = descriptors[route.key];
        const label = TabBarLabelTitle[route.name];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name); // while navigate via tabs then remove existing params(if any)
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            routeName={route.name}
            routeParams={route.params}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

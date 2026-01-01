import { StyleSheet, View } from "react-native";
import { TabBarLabelTitle } from "./Constants";
import TabBarButton from "./TabBarButton";

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
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: IRoute, index: any) => {
        const { options } = descriptors[route.key];
        // console.log("options:", options);
        const label = TabBarLabelTitle[route.name];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
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
            key={index}
            routeName={route.name}
            routeParams={route.params}
            isFocused={isFocused}
            // accessibilityState={isFocused ? { selected: true } : {}}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarButtonTestID}
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

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    marginHorizontal: 30,
    paddingVertical: 2,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});

import { Tabs } from "expo-router";

// icons
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="application"
        options={{
          title: "Application",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "application" : "application-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-application"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name={"add"} size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={18}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

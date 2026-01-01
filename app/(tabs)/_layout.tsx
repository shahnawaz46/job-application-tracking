import TabBar from "@/components/navigation/TabBar";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...(props as any)} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="application" />
      <Tabs.Screen name="add-application" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabsLayout;

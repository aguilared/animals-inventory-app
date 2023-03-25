import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Animals",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="android" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="animalsA"
        options={{
          title: "Arqui",
          tabBarIcon: ({ color }) => <TabBarIcon name="key" color={color} />,
        }}
      />
      <Tabs.Screen
        name="animalsJ"
        options={{
          title: "Jose",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="animalsAp"
        options={{
          title: "Angel",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="animalsC"
        options={{
          title: "Cruz",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="animalsP"
        options={{
          title: "Petra",
          tabBarIcon: ({ color }) => <TabBarIcon name="link" color={color} />,
        }}
      />
      <Tabs.Screen
        name="animalsY"
        options={{
          title: "Yoel",
          tabBarIcon: ({ color }) => <TabBarIcon name="circle" color={color} />,
        }}
      />
    </Tabs>
  );
}

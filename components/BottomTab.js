import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorite from "../screens/Favorite";
import Detail from "../screens/Detail";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarItemStyle: { display: "none" },

          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

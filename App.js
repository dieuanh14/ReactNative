import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./components/BottomTab";

export default function App() {
  return (
    <NavigationContainer>
      {/* Bottom Navigation */}

      {/* <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
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
      </Tab.Navigator> */}
      <BottomTab />
    </NavigationContainer>
  );
}

import React from "react";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Favorite from "../screens/Favorite";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#F7A4A4" } }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Favorite" component={Favorite} />
    </Stack.Navigator>
  );
}

import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./components/BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {

  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

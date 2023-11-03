import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./components/BottomTab";
import { NativeBaseProvider } from "native-base";


export default function App() {

  return (
    
    <NativeBaseProvider>
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

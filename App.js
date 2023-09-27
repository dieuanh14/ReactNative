import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Welcome from "./components/Welcome";
import LittleLemonHeader from "./components/Header";
import LittleLemonFooter from "./components/Footer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MenuItems from "./components/MenuItem";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size,color }) => {
              let iconName;
              if (route.name === "Welcome") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Menu") {
                iconName = "ios-list";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Welcome" component={Welcome} />
          <Tab.Screen name="Menu" component={MenuItems} />
        </Tab.Navigator>
        {/* <Stack.Navigator initialRouteName="welcome">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Menu" component={MenuItems} />
          </Stack.Navigator> */}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  topBox: {
    flex: 0.2,
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },

  middleBox: {
    flex: 0.8,
    flexDirection: "row",
    backgroundColor: "#DFCCFB",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBox: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, Text } from "react-native";
import React from "react";

export default function Detail({ route, navigation }) {
  const { name, price } = route.params;
  return (
    <View>
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
}

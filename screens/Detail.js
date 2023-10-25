import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Detail({ route, navigation }) {
  const { name, price, img, info } = route.params;
  return (
    <View style={styles.foodCard}>
      <Text style={styles.title}>{name}</Text>
      <Image style={styles.image} source={{ uri: img }} />
      <Text style={styles.info}>{info}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{price}</Text>
        <Pressable style={styles.price}>
          <FontAwesome5 name="heart" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  foodCard: {
    marginTop: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
    width: 350,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    padding: 12,
  },
  info: { padding: 12 },
  price: {
    color: "red",
    fontSize: 20,
    paddingBottom: 22,
    padding: 12,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
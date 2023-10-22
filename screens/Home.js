import React from "react";
import {
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
} from "react-native";
import ListOfFood from "../data/ListOfFood";

import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home({ navigation: { navigate } }) {
  //const navigation = useNavigation();

  const renderItem = ({ item }) => <Item name={item.name} price={item.price} />;

  const Item = ({ name, price }) => (
    <>
      <Pressable
        style={styles.foodContainer}
        onPress={() => navigate("Detail", { name, price })}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://w.wallhaven.cc/full/yj/wallhaven-yjyrz7.jpg",
          }}
        />
        <View style={styles.foodDetail}>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <FontAwesome5 name="heart" size={22} color="black" />
        </View>
      </Pressable>
    </>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={ListOfFood}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
  },
  innerContainer: { display: "flex", flexDirection: "row" },
  foodContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "thistle",
    marginTop: 18,
  },
  image: {
    width: 100,
    height: 100,
  },
  foodDetail: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
  titleContainer: {},
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  price: { color: "green", fontSize: 20, marginLeft: 20 },
});

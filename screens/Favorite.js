import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListOfFood from "../data/ListOfFood";
import { Center } from "native-base";
export default function Favorite() {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const storedItemIds = await AsyncStorage.getItem("favoriteItems");
        console.log(storedItemIds);
        if (storedItemIds) {
          const itemIds = JSON.parse(storedItemIds);
          const items = ListOfFood.filter((item) =>
            itemIds.includes(generateItemId(item.name, item.price))
          );
          setFavoriteItems(items);
        }
      } catch (error) {
        console.error("Error retrieving favorite items: ", error);
      }
    };

    fetchFavoriteItems();
  }, [favoriteItems]);

  const generateItemId = (name, price, img) => `${name}-${price}`;

  return (
    <Center>
      <SafeAreaView>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: 900 }}>
          Favorite Items
        </Text>
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) =>
            generateItemId(item.name, item.price, item.img)
          }
          renderItem={({ item }) => (
            <View style={styles.foodContainer}>
              <Text style={styles.name}> {item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Image src={item.img} />
            </View>
          )}
        />
      </SafeAreaView>
    </Center>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  innerContainer: { display: "flex", flexDirection: "row" },
  foodContainer: {
    display: "flex",
    flexDirection: "row",
    height: 60,
    columnGap: 50,
    borderRadius: 16,
    marginTop: 30,
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
    padding: 50,
  },
  titleContainer: {},
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  price: { color: "green", fontSize: 20, marginLeft: 20 },
});

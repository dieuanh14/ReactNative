import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListOfFood from "../data/ListOfFood"; // Import your data source

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

  const generateItemId = (name, price) => `${name}-${price}`;

  return (
    <SafeAreaView>
      <Text>Favorite Items:</Text>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => generateItemId(item.name, item.price)}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

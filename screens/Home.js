import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  SectionList,
  Image,
  View,
  Text,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Categories } from "../data/db";
import { Flex } from "native-base";

export default function Home({ navigation: { navigate } }) {
  const CategoriesForSectionList = Categories.map((category) => ({
    title: category.categoryName,
    data: category.items,
  }));

  const [existingFavorites, setExistingFavorites] = useState([]);

  const generateItemId = (name, price) => `${name}-${price}`;

  const fetchExistingFavorites = async () => {
    try {
      const storedItemIds = await AsyncStorage.getItem("favoriteItems");
      if (storedItemIds) {
        const itemIds = JSON.parse(storedItemIds);
        setExistingFavorites(itemIds);
      } else {
        setExistingFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching existing favorites: ", error);
    }
  };

  useEffect(() => {
    fetchExistingFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      item={item}
      existingFavorites={existingFavorites}
      navigate={navigate}
    />
  );

  const updateFavorites = async (updatedFavorites) => {
    setExistingFavorites(updatedFavorites);
    await AsyncStorage.setItem(
      "favoriteItems",
      JSON.stringify(updatedFavorites)
    );
  };

  const Item = ({ item, existingFavorites, navigate }) => {
    const isFavorite = existingFavorites.includes(
      generateItemId(item.name, item.price)
    );

    const addToFavorites = async () => {
      try {
        const itemId = generateItemId(item.name, item.price);
        const updatedFavorites = [...existingFavorites];

        if (existingFavorites.includes(itemId)) {
          const index = updatedFavorites.indexOf(itemId);
          updatedFavorites.splice(index, 1);
        } else {
          updatedFavorites.push(itemId);
        }

        updateFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error adding/removing item to/from favorites: ", error);
      }
    };

    return (
      <Pressable
        style={styles.foodContainer}
        onPress={() =>
          navigate("Detail", {
            name: item.name,
            price: item.price,
            image: item.image,
            weight: item.weight,
            rating: item.rating,
            color: item.color,
            bonus: item.bonus,
            origin: item.origin,
            existingFavorites,
            updateFavorites,
          })
        }
      >
        <Image style={styles.image} source={{ uri: item.image }} />
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          gap={4}
        >
          <Flex
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price} VND</Text>
          </Flex>
          <Text >Origin: {item.origin} </Text>

          <FontAwesome5
            name="heart"
            size={22}
            color={isFavorite ? "red" : "black"}
            onPress={addToFavorites}
          />
        </Flex>
      </Pressable>
    );
  };

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  return (
    <SectionList
      sections={CategoriesForSectionList}
      keyExtractor={(item, index) => item.name + index}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  foodContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    overflow: "hidden",
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
    justifyContent: "space-around",
  },
  name: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  price: { color: "green", fontSize: 20, marginLeft: 20 },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#F8C4B4",
    padding: 8,
  },
});

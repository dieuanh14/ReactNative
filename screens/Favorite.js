import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Categories } from "../data/db";
import {
  Avatar,
  Box,
  Heading,
  FlatList,
  HStack,
  Spacer,
  VStack,
  Text,
  Center,
  Button,
} from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Favorite({ navigation }) {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    fetchFavoriteItems();
  }, []);

  const generateItemId = (name, price) => `${name}-${price}`;

  const fetchFavoriteItems = async () => {
    try {
      const storedItemIds = await AsyncStorage.getItem("favoriteItems");
      if (storedItemIds) {
        const itemIds = JSON.parse(storedItemIds);
        const items = Categories.reduce((acc, category) => {
          const categoryItems = category.items.filter((item) =>
            itemIds.includes(generateItemId(item.name, item.price))
          );
          return [...acc, ...categoryItems];
        }, []);
        setFavoriteItems(items);
      }
    } catch (error) {
      console.error("Error retrieving favorite items: ", error);
    }
  };

  const removeFromFavorites = async (item) => {
    try {
      const updatedFavorites = favoriteItems.filter(
        (favoriteItem) =>
          generateItemId(favoriteItem.name, favoriteItem.price) !==
          generateItemId(item.name, item.price)
      );
      setFavoriteItems(updatedFavorites);
      await AsyncStorage.setItem(
        "favoriteItems",
        JSON.stringify(
          updatedFavorites.map((item) => generateItemId(item.name, item.price))
        )
      );
    } catch (error) {
      console.error("Error removing item from favorites: ", error);
    }
  };

  useFocusEffect(() => {
    fetchFavoriteItems();
  });
  const clearAllFavorites = async () => {
    try {
      setFavoriteItems([]);
      await AsyncStorage.removeItem("favoriteItems");
    } catch (error) {
      console.error("Error clearing favorites: ", error);
    }
  };
  return (
    <Box padding={5}>
      <Heading fontSize="xl" p="4" pb="3">
        Favorite List
      </Heading>
      <Button
        onPress={clearAllFavorites}
        variant="ghost"
        endIcon={
         <FontAwesome5 name="trash-alt" size={24} />
         
        }
      >
        Clear All
      </Button>{" "}
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => generateItemId(item.name, item.price)}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.image,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.price} VND
                </Text>
              </VStack>
              <Spacer />

              <FontAwesome5
                name="trash-alt"
                size={24}
                color="black"
                onPress={() => removeFromFavorites(item)}
              />
            </HStack>
          </Box>
        )}
      />
    </Box>
  );
}

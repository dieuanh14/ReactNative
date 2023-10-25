import { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
} from "react-native";
import ListOfFood from "../data/ListOfFood";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home({ navigation: { navigate } }) {
  console.log(ListOfFood);

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
      name={item.name}
      price={item.price}
      img={item.img}
      existingFavorites={existingFavorites}
    />
  );

  const Item = ({ name, price, img, existingFavorites }) => {
    const [isFavorite, setIsFavorite] = useState(
      existingFavorites.includes(generateItemId(name, price))
    );
  
    const addToFavorites = async (name, price) => {
      try {
        const itemId = generateItemId(name, price);
        const updatedFavorites = [...existingFavorites];
  
        if (existingFavorites.includes(itemId)) {
          const index = updatedFavorites.indexOf(itemId);
          updatedFavorites.splice(index, 1);
        } else {
          updatedFavorites.push(itemId);
        }
  
        setExistingFavorites(updatedFavorites);
        await AsyncStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites));
        setIsFavorite(updatedFavorites.includes(itemId));
      } catch (error) {
        console.error("Error adding/removing item to/from favorites: ", error);
      }
    };
  
    return (
      <>
        <Pressable
          style={styles.foodContainer}
          onPress={() => navigate("Detail", { name, price, img })}
        >
          <Image
            style={styles.image}
            source={{ uri: img }}
          />
          <View style={styles.foodDetail}>
            <View
              style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}
            >
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <FontAwesome5
              name="heart"
              size={22}
              color={isFavorite ? "red" : "black"}
              onPress={() => addToFavorites(name, price)}
            />
          </View>
        </Pressable>
      </>
    );
  };
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

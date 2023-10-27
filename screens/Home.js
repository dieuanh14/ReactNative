import React, { useState, useEffect } from "react";
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
  const [existingFavorites, setExistingFavorites] = useState([]);
  const [data, setData] = useState(ListOfFood);
  const [filteredData, setFilteredData] = useState(data);
  const [filterType, setFilterType] = useState(null);
  const [activeButton, setActiveButton] = useState("All");

  const handleFilter = (type) => {
    console.log("Filtering by type:", type);
    if (type === "All") {
      setFilteredData(data);
      setFilterType(null);
      setActiveButton("All");
    } else {
      const filtered = data.filter((item) => item.type === type);
      console.log(filtered);
      setFilteredData(filtered);
      setFilterType(type);
      if (type === "fruit") {
        setActiveButton("Fruit");
      } else {
        setActiveButton("Vegetable");
      }
    }
  };

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
      info={item.info}
      type={item.type}
      existingFavorites={existingFavorites}
    />
  );

  const updateFavorites = async (updatedFavorites) => {
    setExistingFavorites(updatedFavorites);
    await AsyncStorage.setItem(
      "favoriteItems",
      JSON.stringify(updatedFavorites)
    );
  };

  const Item = ({ name, price, img, existingFavorites, info, type }) => {
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

        updateFavorites(updatedFavorites);
        setIsFavorite(updatedFavorites.includes(itemId));
      } catch (error) {
        console.error("Error adding/removing item to/from favorites: ", error);
      }
    };
    console.log("List of Food:", ListOfFood);

    return (
      <Pressable
        style={styles.foodContainer}
        onPress={() =>
          navigate("Detail", {
            name,
            price,
            img,
            info,
            type,
            existingFavorites,
            updateFavorites,
          })
        }
      >
        <Image style={styles.image} source={{ uri: img }} />
        <View style={styles.foodDetail}>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 6 }}
          >
          <View style={{display:'flex',justifyContent:"space-evenly",flexDirection:'row'}}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>
            </View>
          </View>
          <FontAwesome5
            name="heart"
            size={22}
            color={isFavorite ? "red" : "black"}
            onPress={() => addToFavorites(name, price)}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 40,
        }}
      >
        <Pressable
          title="All"
          onPress={() => handleFilter("All")}
          style={[
            styles.filterButton,
            activeButton === "All" && styles.activeFilterButton,
          ]}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>All</Text>
        </Pressable>
        <Pressable
          title="Filter Fruit"
          onPress={() => handleFilter("fruit")}
          style={[
            styles.filterButton,
            activeButton === "Fruit" && styles.activeFilterButton,
          ]}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Fruit</Text>
        </Pressable>
        <Pressable
          title="Filter Food"
          onPress={() => handleFilter("vegetable")}
          style={[
            styles.filterButton,
            activeButton === "Vegetable" && styles.activeFilterButton,
          ]}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Vegetable
          </Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "transparent",
    width: 100,
    padding: 12,
    borderRadius: 12,
  },
  activeFilterButton: {
    backgroundColor: "#F8C4B4",
  },
  innerContainer: { display: "flex", flexDirection: "row" },
  foodContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F2D8D8",
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
});

import { StyleSheet, Pressable } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, React } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
} from "native-base";
export default function Detail({ route }) {
  const { name, price, img, info, type, existingFavorites, updateFavorites } =
    route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused, existingFavorites]);
  const generateItemId = (name, price) => `${name}-${price}`;

  const [isFavorite, setIsFavorite] = useState(
    existingFavorites.includes(generateItemId(name, price))
  );

  const addToFavorites = () => {
    const itemId = generateItemId(name, price);
    const updatedFavorites = [...existingFavorites];

    if (!existingFavorites.includes(itemId)) {
      updatedFavorites.push(itemId);
    } else {
      const index = updatedFavorites.indexOf(itemId);
      updatedFavorites.splice(index, 1);
    }

    updateFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <Box alignItems="center" mt="50">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              style={{ height: 20, width: 50, alignItems: "center" }}
              source={{
                uri: img,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            {price}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {type}
            </Text>
          </Stack>
          <Text fontWeight="400">{info}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                <Pressable style={styles.price} onPress={addToFavorites}>
                  <FontAwesome5
                    name="heart"
                    size={24}
                    color={isFavorite ? "red" : "black"}
                  />
                </Pressable>
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  foodCard: {
    marginTop: 70,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
    width: 320,
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
  // image: {
  //   width: "100%",
  //   height: 20,
  // },
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

import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import {
  Box,
  AspectRatio,
  Center,
  HStack,
  Image,
  Stack,
  Text,
  Heading,
  Flex,
} from "native-base";

export default function Detail({ route }) {
  const {
    name,
    price,
    image,
    weight,
    rating,
    color,
    bonus,
    origin,
    existingFavorites,
    updateFavorites,
  } = route.params;
  const isFocused = useIsFocused();

  const generateItemId = (name, price) => `${name}-${price}`;

  const [isFavorite, setIsFavorite] = useState(
    existingFavorites.includes(generateItemId(name, price))
  );
  const addToFavorites = () => {
    try {
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
    } catch (error) {
      console.error("Error adding/removing item to/from favorites: ", error);
    }
  };

  return (
    <Box alignItems="center" mt={20}>
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
              source={{
                uri: image,
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
            {rating}
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
              Price: {price} VND
            </Text>
          </Stack>
          <Text fontWeight="400">Bonus: {bonus}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Flex justifyContent="space-between">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  {color}
                </Text>
                <TouchableOpacity onPress={addToFavorites}>
                  <AntDesign
                    name="hearto"
                    size={24}
                    color={isFavorite ? "red" : "black"}
                  />
                </TouchableOpacity>{" "}
              </Flex>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

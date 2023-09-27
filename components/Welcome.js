import React, { useState } from "react";
import {
  Alert,
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
} from "react-native";
import { Dimensions } from "react-native";

export default function Welcome({ navigation }) {


  return (
    <View style={styles.container}>
      {/* <Image source={require("../img/mep.png")} /> */}
      <Pressable onPress={() => navigation.navigate("Menu")}>
        <Text>View Menu</Text>
      </Pressable>
    </View>
    // <ScrollView indicatorStyle="white" style={styles.container}>
    //   <Text style={styles.headerText}>Welcome to Little Lemon</Text>
    //   <Text style={styles.regularText}>
    //     Little Lemon is a charming neighborhood bistro that serves simple food
    //     and classic cocktails in a lively but casual environment. We would love
    //     to hear more about your experience with us!
    //   </Text>
    //   <TextInput
    //     style={styles.inputBox}
    //     value={firstName}
    //     onChangeText={onChangeFirstName}
    //     placeholder={"First Name"}
    //     onFocus={() => {
    //       Alert.alert("First Name is focused");
    //     }}
    //     clearButtonMode={"always"}
    //     // onBlur={()=>{Alert.alert("First Name is now blured")}}
    //   />
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
//   image: {
// 	flex: 1,
// 	alignSelf: 'stretch',
// 	width: win.width,
// 	height: win.height,
//   },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#EDEFEE",
  },
});

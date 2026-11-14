
import React from "react";
import {
  View,
  TextInput,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={21} color="#999" />

      <TextInput
        style={styles.input}
        placeholder="Cari resep masakan..."
        placeholderTextColor="#AAA"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#F0E7DE"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#352D26"
  }
});

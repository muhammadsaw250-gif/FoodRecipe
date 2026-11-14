
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeCard({
  recipe,
  onPress,
  isFavorite,
  onFavorite
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={21}
            color={isFavorite ? "#E85D5D" : "#555"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{recipe.category}</Text>

        <Text style={styles.name} numberOfLines={1}>
          {recipe.name}
        </Text>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            <Ionicons name="time-outline" size={13} /> {recipe.time}
          </Text>

          <Text style={styles.rating}>
            <Ionicons name="star" size={13} color="#F4B740" />
            {" "}{recipe.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  imageContainer: {
    position: "relative"
  },
  image: {
    width: "100%",
    height: 125,
    backgroundColor: "#F0E8DF"
  },
  favoriteButton: {
    position: "absolute",
    right: 9,
    top: 9,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 7
  },
  content: {
    padding: 11
  },
  category: {
    color: "#E58B38",
    fontSize: 11,
    fontWeight: "600"
  },
  name: {
    color: "#352D26",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9
  },
  infoText: {
    fontSize: 11,
    color: "#888"
  },
  rating: {
    fontSize: 11,
    color: "#555",
    fontWeight: "600"
  }
});

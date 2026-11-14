
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView
} from "react-native";

import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipeContext";

export default function FavoriteScreen({ navigation }) {
  const { recipes, favorites, toggleFavorite } = useRecipes();

  const favoriteRecipes = recipes.filter(recipe =>
    favorites.includes(recipe.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>
          Resep masakan favorit kamu
        </Text>
      </View>

      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={true}
              onPress={() =>
                navigation.navigate("Detail", { recipe: item })
              }
              onFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emoji}>❤️</Text>
          <Text style={styles.emptyTitle}>
            Belum Ada Favorit
          </Text>
          <Text style={styles.emptyText}>
            Simpan resep yang kamu sukai dari halaman Home.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#352D26"
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 6
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  row: {
    justifyContent: "space-between"
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  emoji: {
    fontSize: 55
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#352D26",
    marginTop: 15
  },
  emptyText: {
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22
  }
});


import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import RecipeCard from "../components/RecipeCard";
import CategoryChip from "../components/CategoryChip";
import SearchBar from "../components/SearchBar";
import { useRecipes } from "../hooks/useRecipes";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert"
];

export default function HomeScreen({ navigation }) {
  const {
    recipes,
    favorites,
    toggleFavorite,
    loaded
  } = useRecipes();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter resep berdasarkan pencarian dan kategori
  const filteredRecipes = recipes.filter(recipe => {
    const keyword = search.toLowerCase().trim();

    const matchSearch =
      recipe.name.toLowerCase().includes(keyword) ||
      recipe.category.toLowerCase().includes(keyword) ||
      recipe.ingredients.some(item =>
        item.toLowerCase().includes(keyword)
      );

    const matchCategory =
      selectedCategory === "All" ||
      recipe.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.emptyText}>
            Memuat resep...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello, Food Lover!
            </Text>

            <Text style={styles.subtitle}>
              Mau masak apa hari ini?
            </Text>
          </View>

          <View style={styles.avatar}>
            <Ionicons
              name="restaurant"
              size={25}
              color="#E58B38"
            />
          </View>
        </View>

        {/* Search */}
        <View style={styles.search}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Categories
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map(category => (
            <CategoryChip
              key={category}
              title={category}
              active={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Popular Recipes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Popular Recipes
          </Text>

          <Text style={styles.count}>
            {filteredRecipes.length} resep
          </Text>
        </View>

        {filteredRecipes.length > 0 ? (
          <FlatList
            data={filteredRecipes}
            keyExtractor={item => String(item.id)}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                onPress={() =>
                  navigation.navigate("Detail", {
                    recipe: item
                  })
                }
                isFavorite={favorites.includes(item.id)}
                onFavorite={() =>
                  toggleFavorite(item.id)
                }
              />
            )}
          />
        ) : (
          <View style={styles.empty}>
            <Ionicons
              name="search-outline"
              size={45}
              color="#D5C4B3"
            />

            <Text style={styles.emptyText}>
              Resep tidak ditemukan
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20
  },

  greeting: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#352D26"
  },

  subtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 5
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FBE9D5",
    alignItems: "center",
    justifyContent: "center"
  },

  search: {
    paddingHorizontal: 20,
    marginTop: 24
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 26,
    marginBottom: 14
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#352D26"
  },

  count: {
    fontSize: 12,
    color: "#999"
  },

  categories: {
    paddingHorizontal: 20
  },

  row: {
    justifyContent: "space-between"
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 25
  },

  empty: {
    alignItems: "center",
    padding: 40
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  emptyText: {
    color: "#999",
    marginTop: 12,
    fontSize: 14
  }
});

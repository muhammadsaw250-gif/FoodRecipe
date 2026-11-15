
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipes } from "../hooks/useRecipes";

export default function ProfileScreen() {
  const { recipes, favorites, loaded } = useRecipes();

  if (!loaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E58B38" />
        <Text style={styles.loadingText}>Memuat profil...</Text>
      </SafeAreaView>
    );
  }

  const customCount = recipes.filter(
    recipe => recipe.isCustom
  ).length;

  const menuItems = [
    {
      icon: "book-outline",
      title: "Total Resep",
      value: recipes.length
    },
    {
      icon: "create-outline",
      title: "Resep Buatan Saya",
      value: customCount
    },
    {
      icon: "heart-outline",
      title: "Resep Favorit",
      value: favorites.length
    },
    {
      icon: "restaurant-outline",
      title: "Kategori",
      value: 4
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={45}
            color="#E58B38"
          />
        </View>

        <Text style={styles.name}>Food Lover</Text>
        <Text style={styles.email}>
          foodlover@example.com
        </Text>
        <Text style={styles.description}>
          Selamat datang di FoodRecipe!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        My Activity
      </Text>

      {menuItems.map((item, index) => (
        <View style={styles.menuItem} key={index}>
          <View style={styles.iconBox}>
            <Ionicons
              name={item.icon}
              size={22}
              color="#E58B38"
            />
          </View>

          <Text style={styles.menuTitle}>
            {item.title}
          </Text>

          <Text style={styles.menuValue}>
            {item.value}
          </Text>
        </View>
      ))}

      <View style={styles.about}>
        <Ionicons
          name="information-circle-outline"
          size={21}
          color="#E58B38"
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.aboutTitle}>
            About FoodRecipe
          </Text>

          <Text style={styles.aboutText}>
            FoodRecipe adalah aplikasi untuk menemukan,
            menyimpan, dan berbagi inspirasi resep masakan.
          </Text>

          <Text style={styles.version}>
            Version 1.0.0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginTop: 10,
    color: "#888",
    fontSize: 14
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#352D26",
    marginTop: 20
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginTop: 25,
    elevation: 2
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: "#FBE9D5",
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#352D26",
    marginTop: 13
  },
  email: {
    color: "#999",
    marginTop: 5
  },
  description: {
    color: "#888",
    fontSize: 13,
    marginTop: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#352D26",
    marginTop: 27,
    marginBottom: 14
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 15,
    marginBottom: 11
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FBE9D5",
    alignItems: "center",
    justifyContent: "center"
  },
  menuTitle: {
    flex: 1,
    marginLeft: 13,
    color: "#514438",
    fontSize: 14
  },
  menuValue: {
    color: "#E58B38",
    fontSize: 17,
    fontWeight: "bold"
  },
  about: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 13,
    marginTop: 10,
    gap: 10
  },
  aboutTitle: {
    fontWeight: "bold",
    color: "#352D26"
  },
  aboutText: {
    fontSize: 12,
    color: "#888",
    lineHeight: 19,
    marginTop: 6
  },
  version: {
    color: "#E58B38",
    fontSize: 11,
    marginTop: 9
  }
});

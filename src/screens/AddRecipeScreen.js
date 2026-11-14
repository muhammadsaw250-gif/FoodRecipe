
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { useRecipes } from "../context/RecipeContext";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

export default function AddRecipeScreen({ navigation }) {
  const { addRecipe } = useRecipes();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("Lunch");

  
const handleSubmit = () => {
  const ingredientList = ingredients
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);

  const instructionList = instructions
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);

  if (
    !name.trim() ||
    !description.trim() ||
    !time.trim() ||
    ingredientList.length === 0 ||
    instructionList.length === 0
  ) {
    Alert.alert(
      "Perhatian",
      "Lengkapi nama, deskripsi, waktu, bahan, dan langkah memasak."
    );
    return;
  }

  const recipe = {
    id: Date.now().toString(),
    name: name.trim(),
    description: description.trim(),
    category,
    time: time.trim(),
    difficulty: "Mudah",
    servings: "2 porsi",
    rating: 5.0,
    image: image.trim() ||
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    ingredients: ingredientList,
    instructions: instructionList
  };

  addRecipe(recipe);

  Alert.alert("Berhasil", "Resep berhasil ditambahkan!", [
    {
      text: "OK",
      onPress: () => {
        setName("");
        setDescription("");
        setImage("");
        setTime("");
        setIngredients("");
        setInstructions("");
        setCategory("Lunch");
        navigation.navigate("Home");
      }
    }
  ]);
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Recipe</Text>
          <Text style={styles.subtitle}>
            Bagikan resep masakan favoritmu.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nama Masakan *</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Ayam Geprek"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Deskripsi *</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Deskripsi masakan..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>URL Foto</Text>
          <TextInput
            style={styles.input}
            placeholder="https://..."
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Waktu Memasak *</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: 30 menit"
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.label}>Kategori</Text>
          <View style={styles.categoryContainer}>
            {categories.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  category === item && styles.categoryActive
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === item && styles.categoryTextActive
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Bahan-bahan *</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder={"Masukkan satu bahan per baris"}
            value={ingredients}
            onChangeText={setIngredients}
            multiline
          />

          <Text style={styles.label}>Langkah Memasak *</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder={"Masukkan satu langkah per baris"}
            value={instructions}
            onChangeText={setInstructions}
            multiline
          />

          <TouchableOpacity
            style={styles.submit}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Simpan Resep</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingTop: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#352D26"
  },
  subtitle: {
    color: "#999",
    marginTop: 6,
    fontSize: 14
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 35
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#514438",
    marginBottom: 9,
    marginTop: 17
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEE4D9",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#352D26"
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: "top"
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  categoryButton: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#EEE4D9",
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  },
  categoryActive: {
    backgroundColor: "#E58B38",
    borderColor: "#E58B38"
  },
  categoryText: {
    color: "#777",
    fontSize: 12
  },
  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  submit: {
    backgroundColor: "#E58B38",
    padding: 16,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 28
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15
  }
});

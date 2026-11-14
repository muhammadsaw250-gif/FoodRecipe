
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipes } from "../context/RecipeContext";

export default function DetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { favorites, toggleFavorite, removeRecipe } = useRecipes();

  const isFavorite = favorites.includes(recipe.id);
  const handleDelete = () => {
  Alert.alert(
    "Hapus Resep",
    `Apakah kamu yakin ingin menghapus ${recipe.name}?`,
    [
      {
        text: "Batal",
        style: "cancel"
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          removeRecipe(recipe.id);
          navigation.goBack();
        }
      }
    ]
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={23} color="#352D26" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(recipe.id)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={23}
              color={isFavorite ? "#E85D5D" : "#352D26"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{recipe.category}</Text>

          <Text style={styles.title}>{recipe.name}</Text>

          <Text style={styles.description}>
            {recipe.description}
          </Text>

          <View style={styles.infoContainer}>
            <Info icon="time-outline" label="Waktu" value={recipe.time} />
            <Info icon="bar-chart-outline" label="Kesulitan" value={recipe.difficulty} />
            <Info icon="restaurant-outline" label="Porsi" value={recipe.servings} />
            {recipe.isCustom && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            >
            <Ionicons name="trash-outline" size={19} color="#FFFFFF" />
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
        )}
        </View>

          <Text style={styles.heading}>Ingredients</Text>

          {recipe.ingredients.map((item, index) => (
            <View style={styles.listItem} key={index}>
              <Ionicons name="checkmark-circle" size={19} color="#E58B38" />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.heading}>Cooking Instructions</Text>

          {recipe.instructions.map((item, index) => (
            <View style={styles.step} key={index}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>

              <Text style={styles.stepText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Info({ icon, label, value }) {
  return (
    <View style={styles.infoItem}>
      <Ionicons name={icon} size={21} color="#E58B38" />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2"
  },
  imageContainer: {
    position: "relative"
  },
  image: {
    width: "100%",
    height: 270,
    backgroundColor: "#F0E8DF"
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 18,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 30
  },
  deleteButton: {
  backgroundColor: "#D9534F",
  padding: 15,
  borderRadius: 13,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 9,
  marginTop: 25,
  marginBottom: 20
},
deleteText: {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 14
},
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 18,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 30
  },
  content: {
    padding: 20
  },
  category: {
    color: "#E58B38",
    fontWeight: "bold",
    fontSize: 13
  },
  title: {
    color: "#352D26",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 7
  },
  description: {
    color: "#888",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 16,
    marginTop: 22
  },
  infoItem: {
    alignItems: "center",
    flex: 1
  },
  infoLabel: {
    color: "#999",
    fontSize: 11,
    marginTop: 6
  },
  infoValue: {
    color: "#352D26",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4
  },
  heading: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#352D26",
    marginTop: 27,
    marginBottom: 15
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    gap: 10
  },
  listText: {
    color: "#62564B",
    fontSize: 14,
    flex: 1
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 17,
    gap: 12
  },
  stepNumber: {
    backgroundColor: "#FBE9D5",
    width: 29,
    height: 29,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  stepNumberText: {
    color: "#D47A29",
    fontWeight: "bold"
  },
  stepText: {
    flex: 1,
    color: "#62564B",
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 3
  }
});

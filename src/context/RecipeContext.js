
import React, {
  createContext,
  useEffect,
  useState
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import defaultRecipes from "../data/recipes";

export const RecipeContext = createContext(null);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Memuat data dari AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem("customRecipes");
        const savedFavorites = await AsyncStorage.getItem("favorites");

        let customRecipes = [];
        let favoriteData = [];

        if (savedRecipes) {
          const parsedRecipes = JSON.parse(savedRecipes);

          if (Array.isArray(parsedRecipes)) {
            customRecipes = parsedRecipes;
          }
        }

        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites);

          if (Array.isArray(parsedFavorites)) {
            favoriteData = parsedFavorites;
          }
        }

        setRecipes([
          ...defaultRecipes,
          ...customRecipes
        ]);

        setFavorites(favoriteData);

      } catch (error) {
        console.log("Gagal memuat data:", error);

        setRecipes(defaultRecipes);
        setFavorites([]);
      } finally {
        setLoaded(true);
      }
    };

    loadData();
  }, []);

  // Menyimpan data ke AsyncStorage
  useEffect(() => {
    if (!loaded) return;

    const saveData = async () => {
      try {
        const customRecipes = recipes.filter(
          recipe => recipe.isCustom
        );

        await AsyncStorage.setItem(
          "customRecipes",
          JSON.stringify(customRecipes)
        );

        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(favorites)
        );

      } catch (error) {
        console.log("Gagal menyimpan data:", error);
      }
    };

    saveData();
  }, [recipes, favorites, loaded]);

  // Menambahkan atau menghapus favorit
  const toggleFavorite = (id) => {
    setFavorites(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id]
    );
  };

  // Menambahkan resep baru
  const addRecipe = (recipe) => {
    setRecipes(previous => [
      {
        ...recipe,
        isCustom: true
      },
      ...previous
    ]);
  };

  // Menghapus resep
  const removeRecipe = (id) => {
    setRecipes(previous =>
      previous.filter(recipe => recipe.id !== id)
    );

    setFavorites(previous =>
      previous.filter(item => item !== id)
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        toggleFavorite,
        addRecipe,
        removeRecipe,
        loaded
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

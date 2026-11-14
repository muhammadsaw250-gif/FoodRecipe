
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import defaultRecipes from "../data/recipes";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem("customRecipes");
        const savedFavorites = await AsyncStorage.getItem("favorites");

        if (savedRecipes) {
          const customRecipes = JSON.parse(savedRecipes);

          setRecipes([
            ...defaultRecipes,
            ...customRecipes
          ]);
        }

        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.log("Gagal memuat data:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadData();
  }, []);

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

  const toggleFavorite = (id) => {
    setFavorites(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id]
    );
  };

  const addRecipe = (recipe) => {
    setRecipes(previous => [
      { ...recipe, isCustom: true },
      ...previous
    ]);
  };

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

export const useRecipes = () => useContext(RecipeContext);


import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

export const useRecipes = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(
      "useRecipes harus digunakan di dalam RecipeProvider"
    );
  }

  return context;
};

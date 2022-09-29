import { getFavoriteTranslations } from "../helpers/favoritesStorage";
import { useState } from "react";

export default function useFavoriteTranslations() {
  const [favoriteTranslations, setFavoriteTranslations] = useState(
    getFavoriteTranslations()
  );

  const toggle = (translation) => {
    setFavoriteTranslations(getFavoriteTranslations());
  };

  return {
    favoriteTranslations,
    toggle,
  };
}

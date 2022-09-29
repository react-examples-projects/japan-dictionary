import {
  exitsTranslationInFavorites,
  toggleFavoriteTranslation,
} from "../helpers/favoritesStorage";
import useToggle from "./useToggle";

export default function useFavoriteTranslation(translation) {
  const _isFavorite = exitsTranslationInFavorites(translation);
  const [isFavorite, _toggleFavorite] = useToggle(_isFavorite);

  const toggleFavorite = () => {
    toggleFavoriteTranslation(translation);
    _toggleFavorite();
  };

  return { isFavorite, toggleFavorite };
}

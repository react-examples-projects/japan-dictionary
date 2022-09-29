export const getFavoriteTranslations = () => {
  const favs = localStorage.getItem("favorites");
  if (!favs) return [];

  return JSON.parse(favs);
};

export const setFavoriteTranslations = (favs = []) => {
  localStorage.setItem("favorites", JSON.stringify(favs));
};

export const exitsTranslationInFavorites = (translation) => {
  const favoriteTranslations = getFavoriteTranslations();
  return favoriteTranslations.some((t) => t.symbol === translation.symbol);
};

export const toggleFavoriteTranslation = (translation) => {
  if (exitsTranslationInFavorites(translation)) {
    removeFavoriteTranslation(translation);
  } else {
    addFavoriteTranslation(translation);
  }

  return getFavoriteTranslations();
};

export const addFavoriteTranslation = (translation) => {
  const translations = getFavoriteTranslations();
  setFavoriteTranslations([...translations, translation]);
};

export const removeFavoriteTranslation = (translation) => {
  const tFiltered = getFavoriteTranslations().filter(
    (t) => t.symbol !== translation.symbol
  );
  setFavoriteTranslations(tFiltered);
  return tFiltered;
};

export const removeFavoriteTranslations = () => {
  localStorage.removeItem("favorites");
};

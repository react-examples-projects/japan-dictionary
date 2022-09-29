export const getFavorites = () => {
  const favs = localStorage.getItem("favorites");
  return JSON.parse(favs);
};

export const setFavorites = (favs = []) => {
  localStorage.setItem("favorites", JSON.stringify(favs));
};

export const removeFavorites = () => {
  localStorage.removeItem("favorites");
};

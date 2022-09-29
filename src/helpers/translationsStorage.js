import { translationsToArray } from "./utils";

export const getTranslations = async () => {
  if (!localStorage.getItem("translations")) {
    const json = await import("../assets/translations.json");
    const jsonArray = translationsToArray(json);
    setTranslations(jsonArray);
    return jsonArray;
  }
  return JSON.parse(localStorage.getItem("translations"));
};

export const setTranslations = (translations = []) => {
  const arr = translationsToArray(translations);
  localStorage.setItem("translations", JSON.stringify(arr));
};

export const deleteTranslations = () => {
  localStorage.removeItem("translations");
};

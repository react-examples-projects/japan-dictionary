export function normalizeText(text) {
  const result = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return result;
}

export function translationsToArray(json) {
  const translations = Object.values(json)
    .filter((t) => t.trans)
    .map((o) => {
      return {
        ...o,
        fullTrans: o.trans,
        trans: o.trans
          .split(",")
          .map((t) =>
            normalizeText(t.replace(/\([^()]*\)|\[[^()]*\]/gi, "")).trim()
          ),
      };
    });
  return translations;
}

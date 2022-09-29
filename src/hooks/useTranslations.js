import { useEffect, useState } from "react";
import { normalizeText } from "../helpers/utils";
import { getTranslations } from "../helpers/translationsStorage";
import useDebounce from "./useDebounce";
import nprogress from "nprogress";

export default function useTranslations() {
  const [translations, setTranslations] = useState([]);
  const [results, setResults] = useState([]);
  const [word, setWord] = useState("");
  const [wordSearchDebounced, isLoading] = useDebounce(word, 800);
  const wordSearch = normalizeText(wordSearchDebounced);
  const data = results.length ? results : translations;

  const onChangeWord = (e) => {
    const word = e.target.value;
    setWord(word);
  };

  useEffect(() => {
    nprogress.start();
    (async () => {
      const translations = await getTranslations();
      setTranslations(translations);
      nprogress.done();
    })();
  }, []);

  useEffect(() => {
    const _results = translations
      .filter((ts) => {
        return (
          ts.trans.includes(wordSearch) ||
          ts.trans.some((t) => t === wordSearch) ||
          ts.trans.some((t) =>
            t.split(" ").some((t) => t === wordSearch || t.includes(wordSearch))
          )
        );
      })
      .map((t) => ({
        symbol: t.symbol.slice(1, t.symbol.length - 1),
        trans: t.fullTrans.join(", "),
        trans2: t.trans.filter(Boolean).join(", "),
      }));
    setResults(_results);
  }, [translations, wordSearch]);

  return {
    onChangeWord,
    translations,
    results,
    data,
    wordSearch,
    isLoading
  };
}

import { Input, Button } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { translationsToArray, normalizeText } from "./helpers/utils";
import { FixedSizeList as List } from "react-window";
import { FiList } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import useDebounce from "./hooks/useDebounce";
import nprogress from "nprogress";
import Translation from "./components/Translation";

function App() {
  const [tooltip, showTooltip] = useState(true);
  const [translations, setTranslations] = useState([]);
  const [results, setResults] = useState([]);
  const [word, setWord] = useState("");
  const wordSearch = normalizeText(useDebounce(word, 800));
  const data = results.length ? results : translations;

  const onChangeWord = (e) => {
    const word = e.target.value;
    setWord(word);
  };

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
        trans: t.fullTrans,
        trans2: t.trans.filter(Boolean).join(", "),
      }));
    setResults(_results);
  }, [translations, wordSearch]);

  useEffect(() => {
    nprogress.start();
    import("./assets/translations.json").then((json) => {
      let translations;
      if (localStorage.getItem("translations")) {
        translations = JSON.parse(localStorage.getItem("translations"));
      } else {
        translations = translationsToArray(json);
        localStorage.setItem("translations", JSON.stringify(translations));
      }
      setTranslations(translations);
      nprogress.done();
    });
  }, []);

  return (
    <main className="container text-center">
      {tooltip && <ReactTooltip place="top" type="dark" effect="solid" />}

      <Button
        data-tip="Ver favoritos"
        className="btn-favs"
        type="success"
        auto
        onMouseEnter={() => showTooltip(true)}
        onMouseLeave={() => {
          showTooltip(false);
          setTimeout(() => showTooltip(true), 50);
        }}
        iconRight={<FiList />}
      />

      <div className="banner">
        <h3>Diccionario Japonés</h3>
        <p>
          Busca y encuentra palabras del diccionario japonés con más de 50.000
          palabras usadas, puedes filtrar, guardar y seleccionar palabras
          favoritas dentro del diccionario
        </p>
      </div>

      <label htmlFor="word" className="d-block mb-1 mt-4 fw-bold">
        Buscar una palabra
      </label>

      <div className="d-flex flex-column align-items-center mb-2">
        <Input
          placeholder="Escribe una palabra"
          name="word"
          id="word"
          onChange={onChangeWord}
          width="100%"
          className="mt-3"
          scale={1.5}
          autoFocus
          clearable
        />
      </div>

      {wordSearch && (
        <small className="d-block text-start">
          Se encontrarón {results.length} concidencias{" "}
        </small>
      )}

      <List
        height={700}
        itemCount={results.length || translations.length}
        itemSize={60}
        className="mt-5 pe-2 t-list"
      >
        {(props) => <Translation {...props} data={data} />}
      </List>
    </main>
  );
}

export default App;

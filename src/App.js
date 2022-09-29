import { Input, Button } from "@geist-ui/core";
import { FixedSizeList as List } from "react-window";
import { FiList } from "react-icons/fi";
import useTranslations from "./hooks/useTranslations";
import useTooltip from "./hooks/useTooltip";
import useToggle from "./hooks/useToggle";
import Translation from "./components/Translation";
import FavoriteTranslations from "./components/FavoriteTranslations";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const [isOpen, toggleOpen] = useToggle();
  const { mouseEnter, mouseLeave, tooltip } = useTooltip();
  const { onChangeWord, translations, results, data, wordSearch, isLoading } = useTranslations();

  return (
    <main className="container text-center">
      {tooltip}
      
      <FavoriteTranslations {...{ isOpen, toggleOpen }} />

      <Button
        name="favorite_list"
        title="Ver favoritos"
        aria-label="Ver favoritos"
        data-tip="Ver favoritos"
        className="btn-favs"
        type="success"
        onClick={toggleOpen}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        iconRight={<FiList />}
        auto
      />

      <div className="banner">
        <h2>Diccionario Japonés</h2>
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
      {isLoading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="w-100 opacity-gradient mt-5">
            <Skeleton count={10} height={60} />
          </div>
        </SkeletonTheme>
      ) : (
        <List
          height={700}
          itemCount={results.length || translations.length}
          itemSize={60}
          className="mt-5 pe-2 t-list"
        >
          {(props) => <Translation {...props} data={data} />}
        </List>
      )}
    </main>
  );
}

export default App;

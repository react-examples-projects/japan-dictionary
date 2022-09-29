import Modal from "@geist-ui/core/esm/modal/modal";
import { getFavoriteTranslations } from "../helpers/favoritesStorage";
import TranslationsButtons from "./TranslationsButtons";

export default function FavoriteTranslations({ isOpen, toggleOpen }) {
  const favoriteTranslations = getFavoriteTranslations();

  return (
    <Modal visible={isOpen} onClose={toggleOpen} width="600px">
      <Modal.Title className="fw-bolder">Traduciones Favoritas</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Se muestra una lista con tus traducciones marcadas como favoritas
      </Modal.Subtitle>
      <Modal.Content>
        <ul
          className="mt-2 pe-2"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {favoriteTranslations.map((t) => {
            return (
              <li className="d-flex t overflow-hidden" key={t.symbol}>
                <p className="t-kanji">{t.symbol}</p>
                <p className="t-traduc" title={t.trans}>
                  {t.trans}
                </p>

                <TranslationsButtons translation={t} />
              </li>
            );
          })}
        </ul>
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpen}>
        Cerrar
      </Modal.Action>
    </Modal>
  );
}

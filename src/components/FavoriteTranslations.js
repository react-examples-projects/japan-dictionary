import Modal from "@geist-ui/core/esm/modal/modal";
import TranslationsButtons from "./TranslationsButtons";

export default function FavoriteTranslations({
  isOpen,
  toggleOpen,
  favoriteTranslations,
  toggle,
}) {
  return (
    <Modal visible={isOpen} onClose={toggleOpen} width="600px">
      <Modal.Title className="fw-bolder">Traduciones Favoritas</Modal.Title>
      <Modal.Subtitle className="mt-3">
        Se muestra una lista con tus traducciones marcadas como favoritas
      </Modal.Subtitle>
      <Modal.Content>
        {favoriteTranslations.length > 0 ? (
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

                  <TranslationsButtons translation={t} toggle={toggle} />
                </li>
              );
            })}
          </ul>
        ) : (
          <h5>No hay elementos en la lista</h5>
        )}
      </Modal.Content>
      <Modal.Action passive onClick={toggleOpen}>
        Cerrar
      </Modal.Action>
    </Modal>
  );
}

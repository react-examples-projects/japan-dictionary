import { Button, Modal } from "@geist-ui/core";
import {  FiEye } from "react-icons/fi";
import TranslationsButtons from "./TranslationsButtons";
import useToggle from "../hooks/useToggle";

export default function Translation({ index, key, style, data }) {
  const translation = data[index];
  const [isOpen, toggleOpen] = useToggle();

  return (
    <>
      <Modal visible={isOpen} onClose={toggleOpen}>
        <Modal.Title>{translation.symbol}</Modal.Title>
        <Modal.Content>
          <p className="text-center">{translation.trans}.</p>
        </Modal.Content>
        <Modal.Action passive onClick={toggleOpen}>
          Cerrar
        </Modal.Action>
      </Modal>

      <article key={key} style={style} className="d-flex t overflow-hidden">
        <p className="t-kanji">{translation.symbol}</p>
        <p className="t-traduc" title={translation.trans}>
          {translation.trans}
        </p>

        <TranslationsButtons translation={translation}>
          <Button
            name="view_more"
            title="Ver más"
            aria-label="Ver más"
            scale={0.8}
            iconRight={<FiEye />}
            onClick={toggleOpen}
            style={{
              padding: "0 8px",
            }}
            type="abort"
            auto
          />
        </TranslationsButtons>
      </article>
    </>
  );
}

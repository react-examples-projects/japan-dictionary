import copy from "copy-to-clipboard";
import useToggle from "../hooks/useToggle";
import { Button, useToasts, Modal } from "@geist-ui/core";
import { FiHeart, FiCopy, FiEye } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";

export default function Translation({ index, key, style, data }) {
  const { setToast } = useToasts();
  const [isOpen, toggleOpen] = useToggle();
  const _copy = () => {
    copy(data[index].symbol, {
      debug: true,
      message: "Press #{key} to copy",
    });
    setToast({
      text: `El kanji ${data[index].symbol} fue copiado al portapapeles`,
      type: "success",
    });
  };

  return (
    <>
      <Modal visible={isOpen} onClose={toggleOpen}>
        <Modal.Title>{data[index].symbol}</Modal.Title>
        <Modal.Content>
          <p className="text-center">{data[index].trans}.</p>
        </Modal.Content>
        <Modal.Action passive onClick={toggleOpen}>
          Cerrar
        </Modal.Action>
      </Modal>

      <article key={key} style={style} className="d-flex t overflow-hidden">
        <p className="t-kanji">{data[index].symbol}</p>
        <p className="t-traduc" title={data[index].trans}>
          {data[index].trans}
        </p>

        <div className="d-flex gap-1 me-1 ms-auto">
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
          <Button
            name="copy"
            title="Copiar al portapapeles"
            aria-label="Copiar al portapapeles"
            scale={0.8}
            iconRight={<FiCopy />}
            style={{
              padding: "0 8px",
            }}
            type="abort"
            onClick={_copy}
            auto
          />
          <a
            href={`https://translate.google.com/?hl=es&sl=ja&tl=es&text=${data[index].symbol}&op=translate`}
            target="_blank"
            rel="noopener noreferrer"
            name="translate"
            title="Traducir con google"
            aria-label="Traducir con google"
          >
            <Button
              name="translate"
              title="Traducir con google"
              aria-label="Traducir con google"
              scale={0.8}
              iconRight={<SiGoogletranslate />}
              style={{
                padding: "0 8px",
              }}
              type="abort"
              auto
            />
          </a>

          <Button
            name="favorite"
            title="Marcar como favorito"
            aria-label="Marcar como favorito"
            scale={0.8}
            iconRight={<FiHeart />}
            style={{
              padding: "0 8px",
            }}
            type="abort"
            auto
          />
        </div>
      </article>
    </>
  );
}

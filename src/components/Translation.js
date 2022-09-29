import copy from "copy-to-clipboard";
import useToggle from "../hooks/useToggle";
import { Button, useToasts, Modal } from "@geist-ui/core";
import { FiHeart, FiCopy } from "react-icons/fi";

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

      <article
        key={key}
        style={style}
        className="d-flex t overflow-hidden"
        onClick={toggleOpen}
      >
        <p className="t-kanji">{data[index].symbol}</p>
        <p className="t-traduc" title={data[index].trans}>
          {data[index].trans}
        </p>

        <div className="d-flex gap-1 me-1 ms-auto">
          <Button scale={0.8} iconRight={<FiHeart />} type="abort" auto />
          <Button
            scale={0.8}
            iconRight={<FiCopy />}
            type="abort"
            onClick={_copy}
            auto
          />
        </div>
      </article>
    </>
  );
}

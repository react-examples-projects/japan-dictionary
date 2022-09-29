import { Button, useToasts } from "@geist-ui/core";
import { FiHeart, FiCopy } from "react-icons/fi";
import { SiGoogletranslate } from "react-icons/si";
import useFavoriteTranslation from "../hooks/useFavoriteTranslation";
import copy from "copy-to-clipboard";

export default function TranslationsButtons({
  translation,
  children,
  toggle,
  ...props
}) {
  const { setToast } = useToasts();
  const { isFavorite, toggleFavorite } = useFavoriteTranslation(translation);
  const _toggleFavorite = () => {
    toggleFavorite();
    toggle?.(translation);
  };
  
  const _copy = () => {
    copy(translation.symbol, {
      debug: true,
      message: "Press #{key} to copy",
    });
    setToast({
      text: `El kanji ${translation.symbol} fue copiado al portapapeles`,
      type: "success",
    });
  };
  return (
    <div className="d-flex gap-1 me-1 ms-auto" {...props}>
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
        href={`https://translate.google.com/?hl=es&sl=ja&tl=es&text=${translation.symbol}&op=translate`}
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
        iconRight={
          <FiHeart
            style={{
              color: isFavorite ? "#CD104D" : null,
              fill: isFavorite ? "#CD104D" : null,
            }}
          />
        }
        style={{
          padding: "0 8px",
        }}
        onClick={_toggleFavorite}
        type="abort"
        auto
      />
      {children}
    </div>
  );
}

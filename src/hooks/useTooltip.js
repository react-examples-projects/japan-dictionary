import ReactTooltip from "react-tooltip";
import { useState } from "react";

export default function useTooltip() {
  const [isVisible, setVisible] = useState(true);
  const tooltip = isVisible ? (
    <ReactTooltip place="top" type="dark" effect="solid" />
  ) : null;

  const mouseEnter = () => setVisible(true);
  const mouseLeave = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 50);
  };
  
  return { mouseLeave, mouseEnter, tooltip };
}

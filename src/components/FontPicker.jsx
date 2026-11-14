import { useCallback } from "react";
import { Button } from "./Button";

const fonts = [
  {
    name: "Comfortaa",
    displayName: "Comfortaa",
  },
  {
    name: "FuzzyBubbles",
    displayName: "Fuzzy Bubbles",
  },
  {
    name: "Gaegu",
    displayName: "Gaegu",
  },
  {
    name: "InstrumentSans",
    displayName: "Instrument Sans",
  },
];

export const FontPicker = (props) => {
  const { setNeedsRefresh } = props;

  const setFont = useCallback((font) => {
    localStorage.setItem("font", font);
    setNeedsRefresh(true);
  }, []);

  return (
    <div>
      {fonts.map((f) => {
        return (
          <Button
            key={f.name}
            fontStyle={f.name}
            onClick={() => setFont(f.name)}
          >
            {f.displayName}
          </Button>
        );
      })}
    </div>
  );
};

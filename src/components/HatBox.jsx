import { Hat } from "./HorseArea";

export const HatBox = (props) => {
  const { hats } = props;

  return (
    <div className="px-4 flex flex-row justify-start items-baseline mb-4 mt-2 gap-4">
      {hats.map((h) => (
        <div key={h} className="flex flex-col items-center justify-center">
          <Hat small hat={h} />
          <p>{h}</p>
        </div>
      ))}
    </div>
  );
};

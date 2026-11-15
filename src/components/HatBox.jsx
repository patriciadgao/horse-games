import { Hat } from "./HorseArea";

export const HatBox = (props) => {
  const { hats } = props;

  return (
    <div className="grid grid-cols-4 gap-2 mb-4 mt-2 items-baseline max-w-[400px]">
      {hats.map((h) => (
        <div key={h} className="flex flex-col items-center justify-center">
          <Hat small hat={h} />
          <p>{h}</p>
        </div>
      ))}
    </div>
  );
};

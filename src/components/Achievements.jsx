import { Apple } from "./HorseArea";

export const Achievements = (props) => {
  const { achievements } = props;

  const numAchieved = achievements.filter((a) => a.has).length;
  const total = achievements.length;

  return (
    <div>
      <div className="DisplayFont font-bold text-lg">Your achievements:</div>
      <div>{`total: ${numAchieved}/${total} (${Math.round((numAchieved * 100) / total)}%)`}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-[800px]">
        {achievements.map((a) => {
          return (
            <div
              key={a.label}
              className={`${a.has ? "" : "opacity-45"} text-center mt-4`}
            >
              <div className="flex h-[50px] items-center justify-center">
                {a.has && <Apple />}
              </div>
              <div className="font-bold text-md">{a.label}</div>
              <div className="flex justify-center text-xs">
                <div className="max-w-[150px]"> {a.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { removeSavedHorse, saveHorse } from "../utils/horseStorageFunctions";
import { Button } from "./Button";
import { PairOfHorses } from "./HorseArea";

export const SavedHorses = (props) => {
  const { savedHorse1, savedHorse2 } = props;

  const currentHorse = JSON.parse(localStorage.getItem("current_horse"));
  const isSavedHorsesFull = savedHorse1 && savedHorse2;

  const savedHorse1Week = JSON.parse(
    localStorage.getItem(`saved_horse_1_week`),
  );
  const currentHorseWeek = JSON.parse(localStorage.getItem("playing_week"));

  return (
    <div>
      <PairOfHorses horse1={savedHorse1} horse2={savedHorse2} small />
      {!savedHorse1 && !savedHorse2 && (
        <div className="pb-2">Aww, you haven’t saved any horses yet.</div>
      )}
      {!isSavedHorsesFull ? (
        <>
          {savedHorse1 && (
            <Button onClick={() => removeSavedHorse(1)}>
              {`remove ${savedHorse1.name}`}
            </Button>
          )}
          {JSON.stringify(savedHorse1) !== JSON.stringify(currentHorse) && (
            <Button onClick={() => saveHorse()}>
              {savedHorse1Week === currentHorseWeek
                ? `saved updated version of ${currentHorse?.name}`
                : `save ${currentHorse?.name}`}
            </Button>
          )}
        </>
      ) : (
        <div>
          <SaveHorseButton savedHorseNumber={1} />
          <SaveHorseButton savedHorseNumber={2} />
          <Button onClick={() => removeSavedHorse(1)}>
            {`remove ${savedHorse1.name}`}
          </Button>
          <Button onClick={() => removeSavedHorse(2)}>
            {`remove ${savedHorse2.name}`}
          </Button>
        </div>
      )}
    </div>
  );
};

const SaveHorseButton = (props) => {
  const { savedHorseNumber } = props;
  const savedHorseWeek = JSON.parse(
    localStorage.getItem(`saved_horse_${savedHorseNumber}_week`),
  );
  const savedHorse = JSON.parse(
    localStorage.getItem(`saved_horse_${savedHorseNumber}`),
  );
  const currentHorseWeek = JSON.parse(localStorage.getItem("playing_week"));
  const currentHorse = JSON.parse(localStorage.getItem("current_horse"));

  return (
    <Button onClick={() => saveHorse(savedHorseNumber)}>
      {currentHorseWeek === savedHorseWeek
        ? `save updated version of ${currentHorse?.name}`
        : `replace ${savedHorse?.natedme}`}
    </Button>
  );
};

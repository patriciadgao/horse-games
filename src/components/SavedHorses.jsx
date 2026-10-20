import { useCallback } from "react";
import { removeSavedHorse, saveHorse } from "../utils/horseStorageFunctions";
import { Button } from "./Button";
import { Horse, PairOfHorses } from "./HorseArea";

export const SavedHorses = (props) => {
  const { savedHorse1, savedHorse2, fetchStableInfo } = props;

  const currentHorse = JSON.parse(localStorage.getItem("current_horse"));
  const isSavedHorsesFull = savedHorse1 && savedHorse2;

  const savedHorse1Week = JSON.parse(
    localStorage.getItem("saved_horse_1_week"),
  );
  const savedHorse2Week = JSON.parse(
    localStorage.getItem("saved_horse_2_week"),
  );
  const currentHorseWeek = JSON.parse(localStorage.getItem("playing_week"));

  const oneHorseIsSame =
    savedHorse1Week === currentHorseWeek ||
    savedHorse2Week === currentHorseWeek;

  const saveAHorse = useCallback(
    (horseNumber) => {
      saveHorse(horseNumber);
      fetchStableInfo();
    },
    [fetchStableInfo],
  );

  const removeAHorse = useCallback(
    (horseNumber) => {
      removeSavedHorse(horseNumber);
      fetchStableInfo();
    },
    [fetchStableInfo],
  );

  return (
    <div>
      {isSavedHorsesFull && (
        <div className="grid grid-cols-2 py-4 max-w-[350px]">
          <PairOfHorses horse1={savedHorse1} horse2={savedHorse2} small />
          <div className="text-center pb-4">{savedHorse1?.name}</div>
          <div className="text-center pb-4">{savedHorse2?.name}</div>
          <SaveHorseButton
            savedHorseNumber={1}
            oneHorseIsSame={oneHorseIsSame}
            saveAHorse={saveAHorse}
          />
          <SaveHorseButton
            savedHorseNumber={2}
            oneHorseIsSame={oneHorseIsSame}
            saveAHorse={saveAHorse}
          />
          <Button onClick={() => removeAHorse(1)} centerText>
            remove
          </Button>
          <Button onClick={() => removeAHorse(2)} centerText>
            remove
          </Button>
        </div>
      )}
      {!savedHorse1 && !savedHorse2 && (
        <div className="pb-2">Aww, you haven’t saved any horses yet.</div>
      )}
      {!isSavedHorsesFull && (
        <>
          {savedHorse1 && (
            <div className="grid grid-cols-1 py-4 max-w-[175px]">
              <Horse horse={savedHorse1} small />
              <div className="text-center pb-4">{savedHorse1.name}</div>
              <SaveHorseButton
                savedHorseNumber={1}
                oneHorseIsSame={oneHorseIsSame}
                saveAHorse={saveAHorse}
              />
              <Button onClick={() => removeAHorse(1)} centerText>
                {`remove ${savedHorse1.name}`}
              </Button>
            </div>
          )}
          {JSON.stringify(savedHorse1) !== JSON.stringify(currentHorse) &&
            savedHorse1Week !== currentHorseWeek && (
              <Button onClick={() => saveAHorse()} centerText>
                {savedHorse1Week === currentHorseWeek
                  ? `saved updated version of ${currentHorse?.name}`
                  : `save ${currentHorse?.name}`}
              </Button>
            )}
        </>
      )}
    </div>
  );
};

const SaveHorseButton = (props) => {
  const { savedHorseNumber, oneHorseIsSame, saveAHorse } = props;
  const savedHorseWeek = JSON.parse(
    localStorage.getItem(`saved_horse_${savedHorseNumber}_week`),
  );
  const savedHorse = JSON.parse(
    localStorage.getItem(`saved_horse_${savedHorseNumber}`),
  );
  const currentHorseWeek = JSON.parse(localStorage.getItem("playing_week"));
  const currentHorse = JSON.parse(localStorage.getItem("current_horse"));

  const isSameHorse =
    JSON.stringify(savedHorse) === JSON.stringify(currentHorse) &&
    savedHorseWeek === currentHorseWeek;

  return isSameHorse || (oneHorseIsSame && !isSameHorse) ? (
    <div />
  ) : (
    <Button onClick={() => saveAHorse(savedHorseNumber)} centerText>
      {currentHorseWeek === savedHorseWeek
        ? `re-save ${currentHorse?.name} here`
        : `replace with ${currentHorse?.name}`}
    </Button>
  );
};

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAppleImageTitle,
  getHorseImageTitle,
} from "../utils/horseFunctions";
import {
  chooseHorse,
  getCurrentDate,
  refreshGameStatus,
} from "../utils/horseGameFunctions";
import { Button } from "./Button";
import { Goals } from "./Goals";

export const HorseArea = (props) => {
  const { needsRefresh, setNeedsRefresh } = props;
  const [currentHorse, setCurrentHorse] = useState();
  const [leftHorse, setLeftHorse] = useState();
  const [rightHorse, setRightHorse] = useState();
  const [isPaused, setIsPaused] = useState();
  const [isFinished, setIsFinished] = useState();
  const [playingDate, setPlayingDate] = useState();
  const [goals, setGoals] = useState();

  const refreshGame = useCallback(() => {
    setCurrentHorse(JSON.parse(localStorage.getItem("current_horse")));
    setLeftHorse(JSON.parse(localStorage.getItem("left_horse")));
    setRightHorse(JSON.parse(localStorage.getItem("right_horse")));
    setGoals(JSON.parse(localStorage.getItem("goals")));

    const isNewlyPaused = localStorage.getItem("playing_state") === "paused";
    const weekFinished = localStorage.getItem("week_finished") === "yes";
    const newPlayingDate = localStorage.getItem("playing_date");

    if (isNewlyPaused && isPaused) {
      toast("oops, the date hasn't changed.", {
        duration: 1800,
        style: {
          background: "none",
          boxShadow: "none",
        },
      });
    }

    setIsPaused(isNewlyPaused);
    setIsFinished(weekFinished);
    setPlayingDate(newPlayingDate);
  }, []);

  useEffect(() => {
    refreshGameStatus();
    refreshGame();
  }, []);

  useEffect(() => {
    if (needsRefresh) {
      refreshGameStatus();
      refreshGame();
      setNeedsRefresh(false);
    }
  }, [needsRefresh]);

  const selectHorse = useCallback((option) => {
    chooseHorse(option);
    setNeedsRefresh(true);
  }, []);

  return (
    <div className="flex flex-col justify-center m-8 gap-4">
      <PlayingDate
        playingDate={playingDate}
        isPaused={isPaused}
        refresh={() => setNeedsRefresh(true)}
      />
      <div className="flex flex-col">
        <div className="mb-10 flex justify-center">
          <Horse horse={currentHorse} isCurrentHorse />
        </div>
        {isPaused ? (
          isFinished ? (
            <div>Congrats on completing the week!</div>
          ) : (
            <div>
              You’ve made today’s choice—come back tomorrow for another one.
            </div>
          )
        ) : (
          <div className="flex justify-center gap-12">
            <Horse horse={leftHorse} onClick={() => selectHorse("left")} />
            <Horse horse={rightHorse} onClick={() => selectHorse("right")} />
          </div>
        )}
      </div>
      {currentHorse && <Goals goals={goals} currentHorse={currentHorse} />}
    </div>
  );
};

const PlayingDate = (props) => {
  const { playingDate, isPaused, refresh } = props;
  const currentDate = getCurrentDate();

  const isBehind = playingDate !== currentDate && !isPaused;
  const playingDateFormatted = new Date(
    `${playingDate}T00:00:00-08:00`,
  ).toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });

  return (
    <div className="DisplayFont text-left mb-4">
      <div className="font-bold text-xl">{playingDateFormatted}</div>
      {isBehind && (
        <div className="font-bold text-md text-lime-600">
          Make choices to catch up to today’s date!
        </div>
      )}
      {isPaused && (
        <div className="text-sky-600">
          <Button onClick={refresh}>click to refresh</Button>
        </div>
      )}
    </div>
  );
};

export const Horse = (props) => {
  const { horse, onClick, isCurrentHorse = false, small = false } = props;

  const title = horse ? getHorseImageTitle(horse) : undefined;

  return horse ? (
    <div
      onClick={onClick}
      className={`${small ? "w-[75px] sm:w-[150px]" : "w-[200px]"} flex items-center flex-col gap-2 ${isCurrentHorse ? "justify-end" : ""} ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
    >
      <img src={require(`../img/${title}.png`)} alt={title} />
      {horse.hat && <Hat hat={horse.hat} small={small} />}
      <Apples numApples={horse.apples ?? 0} small={small} />
    </div>
  ) : null;
};

const Apples = (props) => {
  const { numApples, small = false } = props;

  const horseApples = [];
  for (let i = 0; i < numApples; i++) {
    horseApples.push(i);
  }

  const tooManyApples = numApples > 10;

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {tooManyApples ? (
        <div className="flex gap-2 items-center">
          <Apple small={small} />
          <div className="font-bold">{`×${numApples}`}</div>
        </div>
      ) : (
        horseApples.map((a) => <Apple key={a} small={small} />)
      )}
    </div>
  );
};

export const Apple = (props) => {
  const { small = false } = props;
  const title = getAppleImageTitle();

  return (
    <img
      src={require(`../img/${title}.png`)}
      alt="apple"
      width={small ? 15 : 35}
    />
  );
};

export const Hat = (props) => {
  const { hat, small = false } = props;
  return (
    <img
      src={require(`../img/hat-${hat}.png`)}
      alt={hat}
      width={small ? 50 : 100}
    />
  );
};

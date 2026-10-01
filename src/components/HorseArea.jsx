import { useCallback, useEffect, useMemo, useState } from "react";
import ReactConfetti from "react-confetti";
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
  const [demoOver, setDemoOver] = useState();
  const [goals, setGoals] = useState();

  const refreshGame = useCallback(() => {
    setCurrentHorse(JSON.parse(localStorage.getItem("current_horse")));
    setLeftHorse(JSON.parse(localStorage.getItem("left_horse")));
    setRightHorse(JSON.parse(localStorage.getItem("right_horse")));
    setGoals(JSON.parse(localStorage.getItem("goals")));

    const isNewlyPaused = localStorage.getItem("playing_state") === "paused";
    const weekFinished = localStorage.getItem("week_finished") === "yes";
    const newPlayingDate = localStorage.getItem("playing_date");
    const isDemoOver = localStorage.getItem("demo_over");

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
    setDemoOver(isDemoOver);
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
    <div className="flex flex-col justify-center mx-8">
      <PlayingDate
        playingDate={playingDate}
        isPaused={isPaused}
        refresh={() => setNeedsRefresh(true)}
      />
      <div className="flex flex-col">
        {demoOver && (
          <div className="DisplayFont font-bold text-red-700 flex justify-center">
            <div className="max-w-96">
              Uh oh—looks like the demo period for this game is over. Time to
              bother Pat to have her get it back up and running!
            </div>
          </div>
        )}
        <div className="mb-2 flex justify-center">
          <Horse
            horse={currentHorse}
            showAppleBox={
              currentHorse && (currentHorse.apples > 0 || currentHorse.hat)
            }
          />
        </div>
        {isPaused ? (
          isFinished ? (
            <>
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                colors={["#a1d99a", "#f7becb", "#bee5f7", "#d16949", "#f7eeda"]}
                opacity={80}
                initialVelocityY={7}
                gravity={0.075}
                numberOfPieces={700}
              />
              <div>Congrats on completing the week!</div>
            </>
          ) : (
            <>
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                colors={["#a1d99a", "#f7becb", "#bee5f7", "#d16949", "#f7eeda"]}
                opacity={80}
                initialVelocityY={7}
                gravity={0.075}
                numberOfPieces={100}
              />
              <div>
                You’ve made today’s choice—come back tomorrow for another one.
              </div>
            </>
          )
        ) : (
          <div className="flex justify-center gap-12">
            <PairOfHorses
              horse1={leftHorse}
              horse2={rightHorse}
              onClick={{
                horse1: () => selectHorse("left"),
                horse2: () => selectHorse("right"),
              }}
            />
          </div>
        )}
      </div>
      {currentHorse && (
        <Goals
          goals={goals}
          currentHorse={currentHorse}
          isFinished={isFinished}
        />
      )}
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
          Make choices to catch up to today!
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
  const {
    horse,
    onClick,
    small = false,
    tallHeight = true,
    showAppleBox = true,
  } = props;

  const title = horse ? getHorseImageTitle(horse) : undefined;

  return horse ? (
    <div
      onClick={onClick}
      className={`flex items-center flex-col gap-2 justify-end ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
    >
      <div
        className={`${small ? ` w-[75px] sm:w-[150px] ${tallHeight ? "h-[103px] sm:h-[205px]" : "h-[68px] sm:h-[135px]"}` : `w-[150px] sm:w-[200px] ${tallHeight ? "h-[205px] sm:h-[275px]" : "h-[135px] sm:h-[180px]"}`} flex items-center flex-col gap-2 justify-end`}
      >
        <img src={require(`../img/${title}.png`)} alt={title} />
      </div>
      {showAppleBox && (
        <div
          className={`${small ? "h-[48px]" : "h-[96px]"} flex align-baseline space-x-2 items-center`}
        >
          {horse.hat && <Hat hat={horse.hat} small={small} />}
          <Apples numApples={horse.apples ?? 0} small={small} />
        </div>
      )}
    </div>
  ) : null;
};

export const PairOfHorses = (props) => {
  const { horse1, horse2, onClick, small = false } = props;

  const horse1Title = horse1 ? getHorseImageTitle(horse1) : undefined;
  const horse2Title = horse2 ? getHorseImageTitle(horse2) : undefined;

  const atLeastOneTallHorse = useMemo(() => {
    return (
      horse1Title &&
      horse2Title &&
      (horse1Title.includes("tall") || horse2Title.includes("tall"))
    );
  }, [horse1, horse2]);

  const hasHatsOrApples = useMemo(() => {
    if (!horse1 || !horse2) {
      return false;
    }
    if (horse1.hat || horse2.hat) {
      return true;
    }
    return horse1.apples > 0 || horse2.apples > 0;
  }, [horse1, horse2]);

  return (
    <>
      <Horse
        horse={horse1}
        small={small}
        tallHeight={atLeastOneTallHorse}
        onClick={onClick ? onClick.horse1 : undefined}
        showAppleBox={hasHatsOrApples}
      />
      <Horse
        horse={horse2}
        small={small}
        tallHeight={atLeastOneTallHorse}
        onClick={onClick ? onClick.horse2 : undefined}
        showAppleBox={hasHatsOrApples}
      />
    </>
  );
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

  const appleMap = {
    "apple-1": 36,
    "apple-2": 32,
    "apple-3": 24,
    "apple-4": 24,
    "apple-5": 24,
  };

  const appleWidth = useMemo(() => {
    const width = appleMap[title];

    return small ? (width * 3) / 4 : width;
  }, [title, small]);

  return (
    <img src={require(`../img/${title}.png`)} alt="apple" width={appleWidth} />
  );
};

export const Hat = (props) => {
  const { hat, small = false } = props;

  const hatWidth = useMemo(() => {
    if (["top", "bowler"].includes(hat)) {
      return small ? 42.5 : 85;
    }
    return small ? 50 : 100;
  }, [hat, small]);

  return (
    <img src={require(`../img/hat-${hat}.png`)} alt={hat} width={hatWidth} />
  );
};

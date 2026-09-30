import { useEffect, useState } from "react";
import {
  generateDifferentHorse,
  generateHorse,
  getAppleImageTitle,
  getHorseImageTitle,
  mergeHorses,
} from "../utils/horseFunctions";

export const HorseArea = () => {
  const [currentHorse, setCurrentHorse] = useState(
    JSON.parse(localStorage.getItem("current_horse")),
  );
  const [leftHorse, setLeftHorse] = useState(
    JSON.parse(localStorage.getItem("left_horse")),
  );
  const [rightHorse, setRightHorse] = useState(
    JSON.parse(localStorage.getItem("right_horse")),
  );

  function setHorses(newCurrentHorse) {
    const leftHorse = generateHorse();
    const rightHorse = generateDifferentHorse(leftHorse);

    localStorage.setItem("current_horse", JSON.stringify(newCurrentHorse));
    localStorage.setItem("left_horse", JSON.stringify(leftHorse));
    localStorage.setItem("right_horse", JSON.stringify(rightHorse));

    setCurrentHorse(newCurrentHorse);
    setLeftHorse(leftHorse);
    setRightHorse(rightHorse);
  }

  function chooseHorse(option) {
    let currentHorse = JSON.parse(localStorage.getItem("current_horse"));
    let chosenHorse = JSON.parse(localStorage.getItem(`${option}_horse`));

    const newHorse = mergeHorses(currentHorse, chosenHorse);
    setHorses(newHorse);
  }

  useEffect(() => {
    if (!currentHorse || !leftHorse || !rightHorse) {
      const newHorse = generateHorse();
      setHorses(newHorse);
    }
  }, [currentHorse, leftHorse, rightHorse]);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex flex-col">
        <div className="mb-10 flex justify-center h-96">
          <Horse horse={currentHorse} isCurrentHorse />
        </div>
        <div className="flex gap-12">
          <Horse horse={leftHorse} onClick={() => chooseHorse("left")} />
          <Horse horse={rightHorse} onClick={() => chooseHorse("right")} />
        </div>
      </div>
    </div>
  );
};

const Horse = (props) => {
  const { horse, onClick, isCurrentHorse = false } = props;

  const title = horse ? getHorseImageTitle(horse) : undefined;

  return horse ? (
    <div
      onClick={onClick}
      className={`w-[200px] flex items-center flex-col gap-2 ${isCurrentHorse ? "justify-end" : ""} ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
    >
      <img src={require(`../img/${title}.png`)} alt={title} />
      {horse.hat && <Hat hat={horse.hat} />}
      <Apples numApples={horse.apples ?? 0} />
    </div>
  ) : null;
};

const Apples = (props) => {
  const { numApples } = props;

  const horseApples = [];
  for (let i = 0; i < numApples; i++) {
    horseApples.push(i);
  }

  const tooManyApples = numApples > 10;

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {tooManyApples ? (
        <div className="flex gap-2 items-center">
          <Apple />
          <div className="font-bold">{`×${numApples}`}</div>
        </div>
      ) : (
        horseApples.map((a) => <Apple key={a} />)
      )}
    </div>
  );
};

const Apple = () => {
  const title = getAppleImageTitle();

  return <img src={require(`../img/${title}.png`)} alt="apple" width={35} />;
};

const Hat = (props) => {
  const { hat } = props;
  return <img src={require(`../img/hat-${hat}.png`)} alt={hat} width={100} />;
};

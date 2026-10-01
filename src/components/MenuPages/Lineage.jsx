import { useMemo } from "react";
import { Horse } from "../HorseArea";
import { Modal } from "../Modal";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Lineage = (props) => {
  const { isOpen, setIsOpen } = props;
  const lineage = useMemo(() => {
    return JSON.parse(localStorage.getItem("lineage")) ?? [];
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="lineage">
      <div className="grid grid-cols-3 gap-4 mx-8 place-items-center">
        <div></div>
        <div className="font-bold">Your horse</div>
        <div className="font-bold">Your choice</div>
        {lineage.map((horse, i) => {
          const returnDay = i % 2 === 0;

          return returnDay ? (
            <>
              <div>{days[i % 2]}</div>
              <Horse horse={lineage[i]} small />
            </>
          ) : (
            <Horse horse={lineage[i]} small />
          );
        })}
      </div>
    </Modal>
  );
};

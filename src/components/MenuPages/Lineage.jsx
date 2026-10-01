import React, { useEffect, useState } from "react";
import { Horse } from "../HorseArea";
import { Modal } from "../Modal";

const dayList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Lineage = (props) => {
  const { isOpen, setIsOpen, needsRefresh } = props;
  const [lineage, setLineage] = useState(
    JSON.parse(localStorage.getItem("lineage")) ?? [],
  );

  useEffect(() => {
    if (isOpen || needsRefresh) {
      setLineage(JSON.parse(localStorage.getItem("lineage")) ?? []);
    }
  }, [isOpen, needsRefresh]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="lineage">
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 place-items-center">
          <div></div>
          <div className="font-bold">Your horse</div>
          <div className="font-bold">Your choice</div>
          {lineage.map((horse, i) => {
            const returnDay = i % 2 === 0;

            return returnDay ? (
              <React.Fragment key={i}>
                <div>{dayList[i / 2]}</div>
                <Horse horse={horse} small />
              </React.Fragment>
            ) : (
              <Horse horse={horse} small key={i} />
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

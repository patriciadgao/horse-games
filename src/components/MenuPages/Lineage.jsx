import React, { useEffect, useMemo, useState } from "react";
import { Horse, PairOfHorses } from "../HorseArea";
import { Modal } from "../Modal";

const dayList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "final",
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

  const lineageMap = useMemo(() => {
    const map = [];

    let current_map = [];
    for (const [i, value] of lineage.entries()) {
      const returnDay = i % 2 === 0;

      if (returnDay) {
        current_map.push(dayList[i / 2]);
        current_map.push(value);
      } else {
        current_map.push(value);
        map.push([...current_map]);
        current_map = [];
      }
    }

    if (current_map.length > 0) {
      map.push([...current_map]);
    }

    // set last map label to "current horse" unless it's the final horse
    if (map.length > 0) {
      const lastMapItem = map.at(-1);
      const lastMapLabel = lastMapItem[0];
      if (lastMapLabel !== "final") {
        lastMapItem[0] = "current";
      }
    }

    return map;
  }, [lineage]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="lineage">
      <div className="flex justify-center">
        <div className="DisplayFont grid grid-cols-3 gap-x-2 sm:gap-x-8 gap-y-2 place-items-center">
          <div></div>
          <div className="font-bold mb-2">Your horse</div>
          <div className="font-bold mb-2">Your choice</div>
          {lineageMap.map((row, i) => {
            const hasOneHorseOnly = row.length === 2;

            return (
              <React.Fragment key={i}>
                <div className="font-bold">{row[0]}</div>
                {hasOneHorseOnly ? (
                  <Horse
                    horse={row[1]}
                    showAppleBox={row[1].hat || row[1].apples > 0}
                    tallHeight={
                      row[1].shape.filter((g) => g === "T").length > 1
                    }
                    small
                    oneAppleMax
                  />
                ) : (
                  <PairOfHorses
                    horse1={row[1]}
                    horse2={row[2]}
                    small
                    oneAppleMax
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

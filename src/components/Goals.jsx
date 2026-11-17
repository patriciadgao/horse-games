import React, { useMemo } from "react";
import { interpretHorse } from "../utils/horseFunctions";
import {
  getGoalText,
  getThisWeekPoints,
  isGoalMet,
} from "../utils/horseGameFunctions";

export const Goals = (props) => {
  const { goals, currentHorse, isFinished = false } = props;

  const interpretedHorse = interpretHorse(currentHorse);

  const transformedInfo = useMemo(() => {
    return Object.keys(goals).map((goal) => {
      return {
        goalText: getGoalText(goal, goals[goal]),
        isAchieved: isGoalMet(goal, goals[goal], interpretedHorse),
      };
    });
  }, [goals, currentHorse]);

  const { thisWeekBonus, thisWeekPoints } = useMemo(() => {
    return getThisWeekPoints(goals, currentHorse);
  }, [goals, currentHorse]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="DisplayFont font-bold mt-6 mb-2 text-lg">
        this week’s goals
      </div>
      <div className="grid grid-cols-8 gap-x-2">
        {transformedInfo.map((goal, i) => {
          return (
            <React.Fragment key={i}>
              <div
                className={`text-right col-span-7 ${goal.isAchieved ? "text-lime-600" : ""}`}
              >
                {goal.goalText}
              </div>
              <div
                className={`text-left col-span-1 ${goal.isAchieved ? "text-lime-600" : ""}`}
              >
                {goal.isAchieved ? "✓" : ""}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {isFinished && (
        <div className="mt-6 mb-2">
          {thisWeekBonus > 0 && (
            <>
              <div className="font-bold text-md">
                {`goal points +${thisWeekPoints - thisWeekBonus}`}
              </div>
              <div className="font-bold text-md">
                {`bonus points* +${thisWeekBonus}`}
              </div>
            </>
          )}
          <div className="DisplayFont font-bold text-lg">
            {`total earned this week: ${thisWeekPoints}`}
          </div>
          {thisWeekBonus > 0 && (
            <div className="mt-6 max-w-[400px]">
              {`*You earn 45 bonus points for each horse throughout the week that met all three goals. You did this ${thisWeekBonus / 45} time${thisWeekBonus / 45 > 1 ? "s" : ""}!`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

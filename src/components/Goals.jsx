import React, { useMemo } from "react";
import { interpretHorse } from "../utils/horseFunctions";
import {
  getGoalText,
  getPointsTotal,
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

  const totalEarned = useMemo(() => {
    return getPointsTotal(goals, currentHorse);
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
        <div className="DisplayFont font-bold mt-6 mb-2 text-lg">
          {`points earned this week: ${totalEarned}`}
        </div>
      )}
    </div>
  );
};

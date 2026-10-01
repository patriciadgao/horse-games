import React from "react";
import { interpretHorse } from "../utils/horseFunctions";
import { getGoalText, isGoalMet } from "../utils/horseGameFunctions";

export const Goals = (props) => {
  const { goals, currentHorse } = props;

  const interpretedHorse = interpretHorse(currentHorse);

  const transformedInfo = Object.keys(goals).map((goal) => {
    return {
      goalText: getGoalText(goal, goals[goal]),
      isAchieved: isGoalMet(goal, goals[goal], interpretedHorse),
    };
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="DisplayFont font-bold mt-4 mb-2 text-lg">
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
    </div>
  );
};

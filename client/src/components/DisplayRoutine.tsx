import React from "react";
import { Exercises, TrainingLog } from "../types";

const displayExercises = (elem: Exercises) => {
  const toDisplay = [];
  for (let i = 0; i < elem.sets; i++) {
    toDisplay.push(
      <div
        key={i}
        className={`${i % 2 === 0 ? "bg-slate-200" : "bg-slate-100"}`}
      >
        Set {i + 1}: {elem.reps[i]} x {elem.weight[i]}kg/lb
      </div>
    );
  }
  return toDisplay;
};

/**
 * Receives a training log and returns a jsx element describing routine performed
 * - CONSIDER CHANGING THE KEY VALUE OF EXERCISES, SINCE AN EXERCISE MIGHT BE PERFORMED
 * MORE THAN ONCE DURING A ROUTINE, I.E AT THE BEGINNING AND AT THE END.
 * @param TrainingLog
 */

export const DisplayRoutine = ({ tl }: { tl: TrainingLog }): JSX.Element => {
  const date = new Date(tl.date);
  return (
    <div className="font-workSans">
      <h1 className="text-center text-xl first-letter:font-bold">{tl.name}:</h1>
      <h2 className="text-center text-sm text-slate-500">{date.toString()}</h2>
      <div>
        {tl.comments && (
          <p className="text-center text-slate-600">
            <span className="italic">Comments about the day: </span>
            {tl.comments}
          </p>
        )}
      </div>
      {tl.exercises.map((log) => {
        return (
          <div
            key={log.name}
            className={"mb-6 transition-transform hover:scale-110"}
          >
            <div>
              <b>Exercise:</b> {log.name} for: {displayExercises(log)}
            </div>
            <div className="text-center">
              {log.comments && (
                <p>
                  <span className="italic text-slate-500">
                    Comment about the exercise:
                  </span>{" "}
                  {log.comments}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button";

import { Exercises } from "../../types";
import utils from "../../utils/functionUtils";
import { useAppDispatch, useAppSelector } from "../../state/reduxHooks";
import { handleTag, SingleSelect } from "../OptionSelector";
import { raiseNotification } from "../../state/notificationReducer";
import { submitExercises } from "../../async/submitExercises";
import { useGetExercisesQuery } from "../../state/services/training";

const AddExerciseForm = ({ id }: { id: string }) => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("2");
  const [reps, setReps] = useState(["", ""]);
  const [comment, setComment] = useState("");
  const [weight, setWeight] = useState(["", ""]);
  const { data: exercises, isLoading } = useGetExercisesQuery("exercises");

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trainingToSend: Exercises = {
      name: name,
      sets: Number(sets),
      reps: utils.stringToInt(reps),
      weight: utils.stringToInt(weight),
      comments: comment,
    };
    if (user) {
      void submitExercises(trainingToSend, id, user, dispatch);
    } else {
      dispatch(
        raiseNotification({ type: "WARNING", message: "Can't get user info" })
      );
    }
  };

  const handleVariableInput = (v: string): void => {
    const newReps: string[] = [];
    const newWeight: string[] = [];
    for (let i = 0; i < Number(v); i++) {
      if (reps[i] !== "") {
        newReps[i] = reps[i];
      } else {
        newReps[i] = "";
      }
      if (weight[i] !== "") {
        newWeight[i] = weight[i];
      } else {
        newWeight[i] = "";
      }
    }

    setReps(newReps);
    setWeight(newWeight);
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <SingleSelect
            name="Exercise selector"
            options={exercises}
            onChange={(e) => setName(handleTag(e))}
          />
          <Input
            name="Sets"
            value={sets}
            placeholder="Sets"
            required
            type="number"
            onChange={({ target }) => {
              const value = target.value;
              setSets(value);
              handleVariableInput(value);
            }}
          />
          {reps.map((r, index) => {
            return (
              <div key={index}>
                <Input
                  name={`Reps on set ${index + 1}`}
                  value={r}
                  type="number"
                  placeholder="reps performed"
                  onChange={({ target }: { target: HTMLInputElement }) => {
                    const value = target.value;
                    const repsToSet: string[] = [...reps];
                    repsToSet[index] = value;
                    setReps(repsToSet);
                  }}
                  required
                />
              </div>
            );
          })}

          {weight.map((w, index) => {
            return (
              <div key={index}>
                <Input
                  name={`Weight on set ${index + 1}`}
                  placeholder="kg/lb"
                  type="number"
                  value={w}
                  onChange={({ target }: { target: HTMLInputElement }) => {
                    const value = target.value;
                    const weightToSet: string[] = [...weight];
                    weightToSet[index] = value;
                    setWeight(weightToSet);
                  }}
                  required
                />
              </div>
            );
          })}

          <Input
            name="Comment"
            placeholder="Something about this exercise"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <Button action="SEND" type="submit">
          Add exercise to log
        </Button>
      </div>
    </form>
  );
};

export default AddExerciseForm;

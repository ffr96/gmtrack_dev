import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import AddMeasures from "./AddMeasures";

import { useAppDispatch, useAppSelector } from "state/reduxHooks";
import { raiseNotification } from "state/notificationReducer";
import { getDate } from "utils/functionUtils";
import { useSubmitWeightMutation } from "state/services/serverAPI";
import { Measures } from "types";

const AddWeightForm = () => {
  const [comments, setComment] = useState("");
  const [weight, setWeight] = useState("");
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measures, setMeasures] = useState<Measures | undefined>();
  const [submitWeight, weightState] = useSubmitWeightMutation();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const date = getDate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trainingToSend = {
      date: date,
      weight: Number(weight),
      comments: comments,
      measures: measures,
    };

    if (user) {
      void submitWeight({ id: user.id, body: trainingToSend });
      console.log(weightState.isSuccess);
    } else {
      dispatch(
        raiseNotification({ type: "WARNING", message: "Unexpected error" })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <Input name="Date" disabled={true} value={date} />
        <Input
          name="Comment"
          placeholder="Comments about this day"
          value={comments}
          onChange={({ target }) => setComment(target.value)}
        />
        <Input
          name="Weight"
          type="number"
          required
          placeholder="Weight on this day kg/lb"
          value={weight}
          onChange={({ target }) => setWeight(target.value)}
        />
        <span>
          Add measurements?{" "}
          <input
            type="checkbox"
            onClick={() => setShowMeasurements(!showMeasurements)}
          />
        </span>

        {showMeasurements && (
          <div className="animate-fadeIn">
            <AddMeasures measures={measures} setMeasures={setMeasures} />
          </div>
        )}

        <div className="text-center">
          <Button type="submit" action="SEND">
            Create new weight log
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddWeightForm;

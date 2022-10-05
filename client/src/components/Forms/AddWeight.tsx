import React, { useState } from "react";
import Button from "../Elements/Button";
import Input from "../Input/Input";
import AddMeasures from "./MeasuresExpandedForm";
import { useSubmitWeightMutation } from "state/services/serverAPI";

import { useAppSelector } from "state/reduxHooks";
import { getDate } from "utils/functionUtils";
import { Measures } from "types";

const AddWeightForm = () => {
  const [comments, setComment] = useState("");
  const [weight, setWeight] = useState("");
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measures, setMeasures] = useState<Measures | undefined>();
  const [submitWeight] = useSubmitWeightMutation();

  const user = useAppSelector((state) => state.user);
  const date = getDate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trainingToSend = {
      weight: Number(weight),
      date: date,
      comments: comments,
      measures: showMeasurements ? measures : undefined,
    };

    if (user) {
      void submitWeight({ id: user.id, body: trainingToSend });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <Input name="Date" disabled={true} value={date} />
        <Input
          id="add-weight-comment"
          name="Comment"
          placeholder="Comments about this day"
          value={comments}
          onChange={({ target }) => setComment(target.value)}
        />
        <Input
          id="add-weight-value"
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
            id="measurements-checkbox"
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
          <Button type="submit" action="SEND" id="submit-weight">
            Create new weight log
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddWeightForm;

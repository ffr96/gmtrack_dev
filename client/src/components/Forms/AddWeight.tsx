import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import AddMeasures from "./AddMeasures";
import { useSubmitWeightMutation } from "state/services/serverAPI";

import { useAppSelector } from "state/reduxHooks";
import { getDate } from "utils/functionUtils";
import { Measures } from "types";
import { useDispatch } from "react-redux";
import { raiseNotification } from "state/notificationReducer";

const AddWeightForm = () => {
  const [comments, setComment] = useState("");
  const [weight, setWeight] = useState("");
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measures, setMeasures] = useState<Measures | undefined>();
  const [submitWeight, { isError, isSuccess }] = useSubmitWeightMutation();
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user);
  const date = getDate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        raiseNotification({
          type: "SUCCESS",
          message: "Success adding weight!",
        })
      );
    }
    if (isError) {
      dispatch(
        raiseNotification({
          type: "ERROR",
          message: "Error while adding weight",
        })
      );
    }
  }, [isSuccess, isError]);

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

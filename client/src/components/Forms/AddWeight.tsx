import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";

import { useAppDispatch, useAppSelector } from "../../state/reduxHooks";
import { raiseNotification } from "../../state/notificationReducer";
import { getDate } from "../../utils/functionUtils";
import { useSubmitWeightMutation } from "../../state/services/serverAPI";

const AddWeightForm = () => {
  const [comments, setComment] = useState("");
  const [weight, setWeight] = useState("");
  const date = getDate();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [submitWeight, weightState] = useSubmitWeightMutation();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trainingToSend = {
      date: date,
      weight: Number(weight),
      comments: comments,
    };

    if (user) {
      void submitWeight({ id: user.id, body: trainingToSend });
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

import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input/Input";
import { submitTraining } from "../../async/submitTraining";

import { useAppDispatch, useAppSelector } from "../../state/reduxHooks";
import { raiseNotification } from "../../state/notificationReducer";
import { muscleGroup } from "../../utils/trainingDB";
import { MultiSelect } from "../OptionSelector";
import { handleGroupTags } from "../OptionSelector";
import { getDate } from "../../utils/functionUtils";

const AddTrainingForm = () => {
  const [name, setName] = useState("");
  const [comments, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const date = getDate();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trainingToSend = {
      date: date,
      comments: comments,
      exercises: [],
      name: name,
      tags: tags,
    };

    if (user) {
      void submitTraining(user, trainingToSend, dispatch);
    } else {
      dispatch(
        raiseNotification({ type: "WARNING", message: "Unexpected error" })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <Input
          name="Name"
          placeholder="Name this training"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <Input name="Date" disabled={true} value={date} />
        <Input
          name="Comment"
          placeholder="Comments about this day"
          value={comments}
          onChange={({ target }) => setComment(target.value)}
        />

        <MultiSelect
          name="training log select"
          options={muscleGroup}
          onChange={(e) => setTags(handleGroupTags(e))}
        />
        <div className="text-center">
          <Button type="submit" action="SEND">
            Create new training log
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTrainingForm;

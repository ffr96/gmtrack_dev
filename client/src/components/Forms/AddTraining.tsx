import React, { useState } from "react";
import Button from "../Elements/Button";
import Input from "../Input/Input";
import { MultiSelect } from "../OptionSelector";
import { handleGroupTags } from "../OptionSelector";

import { useAppSelector } from "state/reduxHooks";
import { muscleGroup } from "utils/trainingDB";
import { getDate } from "utils/functionUtils";
import { useSubmitLogsMutation } from "state/services/serverAPI";

const AddTrainingForm = () => {
  const [name, setName] = useState("");
  const [comments, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const date = getDate();
  const [submitTraining] = useSubmitLogsMutation();

  const user = useAppSelector((state) => state.user);

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
      void submitTraining({ id: user.id, body: trainingToSend });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <Input
          id="add-training-name"
          name="Name"
          placeholder="Name this training"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <Input name="Date" disabled={true} value={date} />
        <Input
          id="add-training-comment"
          name="Comment"
          placeholder="Comments about this day"
          value={comments}
          onChange={({ target }) => setComment(target.value)}
        />

        <MultiSelect
          id="add-training-muscles"
          name="training log select"
          options={muscleGroup}
          onChange={(e) => setTags(handleGroupTags(e))}
        />
        <div className="text-center">
          <Button type="submit" action="SEND" id="submit-training">
            Create new training log
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddTrainingForm;

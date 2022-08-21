import React from "react";
import { Measures } from "../../types";
import Input from "../Input/Input";

const AddMeasures = ({
  measures,
  setMeasures,
}: {
  measures: Measures | undefined;
  setMeasures: React.Dispatch<React.SetStateAction<Measures | undefined>>;
}) => {
  return (
    <div>
      <Input
        name="Calves"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.calves ? measures.calves : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, calves: value });
        }}
      />
      <Input
        name="Arms"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.arms ? measures.arms : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, arms: value });
        }}
      />
      <Input
        name="Chest"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.chest ? measures.chest : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, chest: value });
        }}
      />
      <Input
        name="Legs"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.legs ? measures.legs : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, legs: value });
        }}
      />
      <Input
        name="Waist"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.waist ? measures.waist : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, waist: value });
        }}
      />
      <Input
        name="Hips"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.hips ? measures.hips : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, hips: value });
        }}
      />
      <Input
        name="Neck"
        type="number"
        placeholder="cm/inch"
        min={1}
        value={measures?.neck ? measures.neck : ""}
        onChange={({ target }) => {
          const value = Number(target.value);
          setMeasures({ ...measures, neck: value });
        }}
      />
    </div>
  );
};

export default AddMeasures;

/**
 * calves?: number | undefined;
    arms?: number | undefined;
    chest?: number | undefined;
    legs?: number | undefined;
    waist?: number | undefined;
    neck?: number | undefined;
    hips?: number | undefined;
 */

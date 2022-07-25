import { useState } from "react";

const useInput = (): [value: string, changeValue: (change: string) => null] => {
  const [value, setValue] = useState("");

  const changeValue = (change: string) => {
    setValue(change);
    return null;
  };

  return [value, changeValue];
};

export { useInput };

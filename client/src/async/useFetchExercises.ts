import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constants";

const useFetchExercises = () => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<
    {
      value: string;
      label: string;
      isDisabled?: boolean;
    }[]
  >([{ value: "loading", label: "loading" }]);
  useEffect(() => {
    const fetchExc = async () => {
      const res = await axios.get<
        { value: string; label: string; isDisabled?: boolean }[]
      >(`${baseUrl}/exercises`);
      if (res) {
        setLoading(false);
        setExercises(res.data);
      }
    };
    void fetchExc();
  }, []);

  return { loading, exercises };
};

export { useFetchExercises };

import { Exercises } from "../types";
import { baseUrl, defaultErrorMessage } from "../utils/constants";
import { raiseNotification } from "../state/notificationReducer";
import { addExerciseToLog } from "../state/trainingReducer";
import { AppDispatch } from "../state/store";
import axios from "axios";
import { isValidError } from "../utils/functionUtils";
import { User } from "../types";

const submitExercises = async (
  trainingToSend: Exercises,
  id: string,
  user: User,
  dispatch: AppDispatch
) => {
  try {
    const received = await axios.post<Exercises>(
      `${baseUrl}/users/${user.id}/logs/${id}`,
      trainingToSend,
      { headers: { Authorization: `bearer ${user.token}` } }
    );
    if (received.status === 200) {
      dispatch(addExerciseToLog({ exercises: received.data, id: id }));
      dispatch(
        raiseNotification({
          type: "SUCCESS",
          message: "Sucess adding exercise",
        })
      );
    }
  } catch (e) {
    if (isValidError(e)) {
      dispatch(
        raiseNotification({
          type: "ERROR",
          message: e.response.data.message,
        })
      );
    } else {
      dispatch(
        raiseNotification({
          type: "WARNING",
          message: defaultErrorMessage,
        })
      );
    }
  }
};
export { submitExercises };

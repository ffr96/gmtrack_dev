import { TrainingLog, User } from "../types";
import { baseUrl } from "../utils/constants";
import { addTrainingLog } from "../state/trainingReducer";
import { raiseNotification } from "../state/notificationReducer";
import { AppDispatch } from "../state/store";
import axios from "axios";

const submitTraining = async (
  user: User,
  trainingToSend: Omit<TrainingLog, "id">,
  dispatch: AppDispatch
) => {
  if (user) {
    try {
      const response = await axios.post<TrainingLog>(
        `${baseUrl}/users/${user.id}/logs`,
        trainingToSend,
        { headers: { Authorization: `bearer ${user.token}` } }
      );
      if (response.status === 200) {
        dispatch(addTrainingLog(response.data));
        dispatch(
          raiseNotification({
            type: "SUCCESS",
            message: "Success adding training log!",
          })
        );
      }
    } catch (e) {
      console.log(e);
      dispatch(
        raiseNotification({
          type: "ERROR",
          message: "Error adding training log!",
        })
      );
    }
  }
};

export { submitTraining };

import axios from "axios";
import { removeTrainingLog } from "../state/trainingReducer";
import { User } from "../types";
import { AppDispatch } from "../state/store";
import { baseUrl } from "../utils/constants";
import { NavigateFunction } from "react-router-dom";
import { raiseNotification } from "../state/notificationReducer";

const deleteLog = async (
  user: User,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  logID: string
) => {
  if (user) {
    const onDelete = await axios.delete(
      `${baseUrl}/users/${user.id}/logs/${logID}`,
      { headers: { Authorization: `bearer ${user.token}` } }
    );
    if (onDelete) {
      dispatch(removeTrainingLog(logID));
      dispatch(
        raiseNotification({
          type: "SUCCESS",
          message: "Successfully deleted log!",
        })
      );
      navigate(-1);
    }
  }
};

export { deleteLog };

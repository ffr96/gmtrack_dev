import { User } from "../types";
import { baseUrl, defaultErrorMessage } from "../utils/constants";
import { raiseNotification } from "../state/notificationReducer";
import { AppDispatch } from "../state/store";
import axios from "axios";
import { isValidError } from "../utils/functionUtils";

const submitRegister = async (
  username: string,
  password: string,
  email: string,
  dispatch: AppDispatch
) => {
  try {
    const { status } = await axios.post<User>(`${baseUrl}/users`, {
      username: username,
      password: password,
      email: email,
    });
    if (status === 200) {
      dispatch(
        raiseNotification({
          type: "SUCCESS",
          message: "Registered successfuly!",
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
        raiseNotification({ type: "ERROR", message: defaultErrorMessage })
      );
    }
  }
};

export { submitRegister };

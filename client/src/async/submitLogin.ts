import { User } from "../types";
import { baseUrl, defaultErrorMessage } from "../utils/constants";
import { raiseNotification } from "../state/notificationReducer";
import { setUser } from "../state/userReducer";
import { AppDispatch } from "../state/store";
import axios from "axios";
import { isValidError } from "../utils/functionUtils";

const submitLogin = async (
  username: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const { data: user } = await axios.post<User>(`${baseUrl}/login`, {
      username: username,
      password: password,
    });
    if (user) {
      localStorage.setItem("user-token", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(
        raiseNotification({
          type: "SUCCESS",
          message: "Successfuly logged in",
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

export { submitLogin };

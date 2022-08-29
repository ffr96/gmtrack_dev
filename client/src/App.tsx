import React from "react";
import axios from "axios";
import { setTrainingLog as initTraining } from "./state/trainingReducer";
import { useAppDispatch, useAppSelector } from "./state/reduxHooks";
import { TrainingLog } from "./types";

import { baseUrl } from "./utils/constants";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserCommandBar } from "./components/UserNavBar";

import LogsPage from "./routes/LogsPage";
import WeightPage from "./routes/Weight";
import NotFound from "./routes/NotFound";
import UserInfo from "./routes/UserInfo";
import LoginPage from "./routes/Login";
import Notification from "./components/Notification";
import ModalPage from "./routes/ModalPage";
import Footer from "./components/Footer";

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  React.useEffect(() => {
    const setTrainingLog = async () => {
      if (user) {
        const { data: trainingLog } = await axios.get<TrainingLog[]>(
          `${baseUrl}/users/${user.id}/logs`,
          { headers: { Authorization: `bearer ${user.token}` } }
        );
        dispatch(initTraining(trainingLog));
      }
    };
    void setTrainingLog();
  }, [user]);

  return (
    <div className="bg-slate-300">
      <Notification />
      {(user && (
        <div>
          <UserCommandBar />
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<UserInfo />}></Route>
            <Route path="logs" element={<LogsPage />} />
            <Route path="weight-progress" element={<WeightPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {state?.backgroundLocation && (
            <Routes>
              <Route path="logs/:id" element={<ModalPage />} />
            </Routes>
          )}
        </div>
      )) || <LoginPage />}
      <Footer />
    </div>
  );
};

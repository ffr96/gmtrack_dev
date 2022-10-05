import { useAppSelector } from "./state/reduxHooks";

import { Routes, Route, useLocation } from "react-router-dom";
import { UserNavBar } from "./components/Layout/UserNavBar";

import LogsPage from "./routes/LogsPage";
import WeightPage from "./routes/Weight";
import NotFound from "./routes/NotFound";
import UserInfo from "./routes/UserInfo";
import LoginPage from "./routes/Login";
import Notification from "./components/Notification";
import ModalPage from "./routes/ModalPage";
import Footer from "./components/Layout/Footer";

export const App = () => {
  const user = useAppSelector((state) => state.user);
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="bg-slate-300">
      <Notification />
      {(user && (
        <div>
          <UserNavBar />
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

import React from "react";
import { icons } from "../utils/icons";

import { Link } from "react-router-dom";
import { raiseNotification } from "../state/notificationReducer";
import { useAppDispatch } from "../state/reduxHooks";
import { removeUser } from "../state/userReducer";

interface AppType {
  changeTheme?: () => void;
}

export const UserCommandBar = ({ changeTheme }: AppType) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    dispatch(raiseNotification({ type: "SUCCESS", message: "Logged out!" }));
    dispatch(removeUser());
  };

  const items = [
    {
      key: "traininglogs",
      to: "",
      text: "Training Logs",
      icon: icons.book,
    },
    {
      key: "strengthprogress",
      to: "strength-progress",
      text: "Strength Progress",
      icon: icons.dumbbell(false),
    },
    {
      key: "weightprogress",
      to: "weight-progress",
      text: "Weight Progress",
      icon: icons.weightScale,
    },
    {
      key: "logout",
      to: "",
      text: "Log Out",
      icon: icons.arrowRight,
      onClick: handleLogout,
    },
  ];

  return (
    <div>
      <div className="flex flex-row bg-teal-300 font-raleway font-bold shadow-md">
        {items &&
          items.map((i) => {
            return (
              <div
                className="flex flex-col items-center p-2 hover:scale-105 md:flex-row"
                key={i.key}
              >
                <div className="pr-1">{i.icon}</div>
                <Link
                  to={i.to}
                  className="pr-2"
                  onClick={i.key === "logout" ? handleLogout : undefined}
                >
                  {i.text}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

import React from "react";
import MessageBar from "./MessageBar";
import { useAppDispatch, useAppSelector } from "../../state/reduxHooks";
import { removeNotification } from "../../state/notificationReducer";

const Notification = (): JSX.Element | null => {
  const notification = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  if (!notification) {
    return null;
  }

  setTimeout(() => {
    dispatch(removeNotification());
  }, 2000);

  return (
    <div style={{ fontSize: 20 }}>
      <MessageBar type={notification.type} message={notification.message} />
    </div>
  );
};

export default Notification;

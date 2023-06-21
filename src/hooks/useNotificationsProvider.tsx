import { nanoid } from "nanoid";
import React, { createContext, useState } from "react";

export type Notification = {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
};

type NotificationsContext = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
};

export const NotificationContext = createContext<NotificationsContext>(
  {} as NotificationsContext
);

type NotificationProviderProps = {
  children: React.ReactNode | null;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { ...notification, id: nanoid() },
    ]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const contextValue = {
    notifications,
    addNotification,
    dismissNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

import { useContext } from "react";
import {
  Notification,
  NotificationContext,
} from "../../hooks/useNotificationsProvider";
import { NotificationItem } from "./NotificationItem";

export const Notifications = () => {
  const { notifications, dismissNotification } =
    useContext(NotificationContext);

  return (
    <div
      aria-live="assertive"
      className="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      {notifications.map((notification: Notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};

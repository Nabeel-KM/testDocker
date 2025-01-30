/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import styles from "./notification.module.scss";
import { GoBell } from "react-icons/go"

interface NotificationProps {
  onClickOutside?: () => void;
}


const NotificationCompo = (props: NotificationProps) => {
  const { onClickOutside } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [notification, setnotification] = useState<boolean>(false)
  const [notificationNumber, setNotificationNumber] = useState<number | undefined>(4);
  useEffect(() => {
    FatchNotificationDate();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        onClickOutside && onClickOutside();
        setnotification(notification);
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [notification, onClickOutside]);

  const FatchNotificationDate = async () => {
    // let response = await HTTP_CLIENT.get("/");
    // setInterval(async () => {
    // let res = localStorage.getItem("authToken");
    // if (res) {
    // let response = await HTTP_CLIENT.get("/");
    // setNotificationData(response.data);
    // }
    // }, 60000 * 5);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper} ref={ref}>
          <div
            className={styles.notification}
            onClick={() => setnotification(!notification)}
          >
            <GoBell className={styles.icon} />
            {notificationNumber &&
              <div className={styles.notificationbadge}>
                {notificationNumber}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCompo;

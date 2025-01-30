/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styles from "./splashscreen.module.css";
import { ThreeDots } from "react-loader-spinner";


const Splash = ({ setSplash }: any) => {
  useEffect(() => {
    setSplash(false);
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img
              src={"/icon.svg"}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.loader}>
            <ThreeDots
              height="60"
              width="60"
              radius="9"
              color="#2dc3c3"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Splash;

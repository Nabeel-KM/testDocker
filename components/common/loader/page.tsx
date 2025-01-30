import { RotatingLines, ThreeCircles } from "react-loader-spinner";
import styles from "./loader.module.scss";
import {
  FillingBottle,
  BouncingBalls,
  BarWave,
  Messaging,
} from "react-cssfx-loading";
export const Loader = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
      />
    </div>
  );
};
export const LoaderBlack = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
      />
    </div>
  );
};
export const LoaderWave = () => {
  return (
    <div className={styles.loaderWave}>
      {/* <BarWave color="#FF5760" duration="1s" /> */}
      <ThreeCircles
        height="100"
        width="100"
        color="#FF5760"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

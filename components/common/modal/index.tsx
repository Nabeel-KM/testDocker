import React, { useCallback, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "./modal.module.scss";

interface Props {
  visible: boolean;
  onClose: any;
  children: any;
  btn: boolean;
  deleteAndConfirmBid?: boolean;

}

export default function Modal(Prop: Props) {
  const { visible, onClose, children, btn, deleteAndConfirmBid } = Prop;

  const escFunction = useCallback(
    (e: any) => {
      if (e.type === "click") {
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.removeEventListener("click", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", escFunction, false);
    };
  }, [escFunction]);

  if (visible) {
    return (
      <div className={styles.modal}>
        <div
          className={deleteAndConfirmBid ? styles.deleteAndconfirmMyBid : styles.outer}
        >
          {btn && <RxCross2 className={styles.IconClose} onClick={onClose} />}
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

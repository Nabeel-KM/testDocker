"use-client";
import React, { useState } from "react";
import styles from "./paymentModal.module.scss";
import Modal from "../../modal";
import { CiCircleCheck } from "react-icons/ci"

interface Props {
  handleClose: () => void;
  Open: boolean;
}

const WithdrawAndDeposit = (props: Props) => {
  let { handleClose, Open } = props;
  return (
    <Modal onClose={handleClose} visible={Open} btn={true}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <CiCircleCheck />
        </div>
        <div className={styles.heading}>Your amount has been successfully deposit</div>
      </div>
    </Modal>
  );
};

export default WithdrawAndDeposit;

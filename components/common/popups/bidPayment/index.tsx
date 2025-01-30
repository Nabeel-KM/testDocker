"use-client";
import React, { useState } from "react";
import styles from "./paymentModal.module.scss";
import Modal from "../../modal";
import { CiCircleCheck } from "react-icons/ci"
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  handleClose: () => void;
  Open: boolean;
  setbidAccepted?: () => any;
}

const PlacePaymentModal = (props: Props) => {
  let { handleClose, Open } = props;
  const router = useRouter()

  const handleNavigate = () => {

    router.push("/live-auction/8-crore")
  }
  return (
    <Modal onClose={handleClose} visible={Open} btn={true}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <CiCircleCheck />
        </div>
        <div className={styles.heading}>Your bid has been placed successfully</div>
        <div className={styles.viewBid} onClick={() => handleNavigate()}>Tap to view your Bid</div>
      </div>
    </Modal>
  );
};

export default PlacePaymentModal;

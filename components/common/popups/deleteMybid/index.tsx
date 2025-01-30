"use-client";
import React, { useState } from "react";
import styles from "./deleteAndConfirmMyBidModal.module.scss";
import Modal from "../../modal";
import { PiWarning } from "react-icons/pi"
import { BsCheckCircle } from "react-icons/bs"
import PinInputDelete from "./OTPVerficiation/pinCode";

interface Props {
  handleClose: () => void;
  Open: boolean;
}

const DeleteAndConfirmMyBid = (props: Props) => {
  let { handleClose, Open } = props;
  const [active, setActive] = useState<number>(0)
  const [otp, setOtp] = useState<string>("");
  const recieveOTP = (value: string) => {
    setOtp(value);
  };
  return (
    <Modal onClose={handleClose} visible={Open} btn={true} deleteAndConfirmBid={true}>
      {active === 0 ?
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <PiWarning />
          </div>
          <div className={styles.description}>
            Are u sure u want to delete this property?
            Due to the active bidding state of this property,
            There will be a loss of 1% if you delete this Bid.
            Deductions are not refundable.
          </div>
          <div className={styles.btnSection}>
            <div className={styles.cancelBtn} onClick={() => handleClose()}>Cancel</div>
            <div className={styles.confirmBtn} onClick={() => setActive(1)}>Confirm</div>

          </div>
        </div>
        : active === 1 ?
          <div className={styles.otpWrapper}>
            <div className={styles.otpIcon}>
              <PiWarning />
            </div>
            <div className={styles.otpDescription}>
              Are u sure u want to delete this property?<br />
              Due to the active bidding state of this property,
              There will be a loss of 1% if you delete this property.<br />
              Deductions are not refundable.
            </div>
            <div className={styles.otpInputs}>
              <div className={styles.otpTitle}>Enter OTP code sent on +92***84239</div>
              <PinInputDelete from="settings" submit={recieveOTP} />
            </div>
            <div className={styles.otpBtnSection}>
              <div className={styles.canclBtn} onClick={() => handleClose()}>Cancel</div>
              <div className={styles.deleteBtn} onClick={() => setActive(2)}>Delete</div>
            </div>
          </div>

          : active === 2 ?
            <div className={styles.otpVerifiedWrapper}>
              <div className={styles.otpVerifiedIcon}>
                <BsCheckCircle />
              </div>
              <div className={styles.otpVerifieddescription}>
                Your bid has been deleted successfully
              </div>
            </div>
            : ""}
    </Modal>
  );
};

export default DeleteAndConfirmMyBid;

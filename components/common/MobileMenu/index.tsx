import React from "react";
import styles from "./mobileMenu.module.scss";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";


export type Props = {
  mobileMenuHandler: () => void;
}
const MobileMenu = ({ mobileMenuHandler }: Props) => {


  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const pathname = usePathname()

  const togglePopup = () => {
    setPopupVisible((preview) => !preview);
  };



  return (
    <>

      <div className={styles.wrapper}>
        <div className={styles.closeRow} onClick={mobileMenuHandler}>
          <CgClose className={styles.closeIcon} />
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.links}>

            <Link
              href="/"
              onClick={mobileMenuHandler}
              className={
                pathname === "/" ? styles.active : styles.inactive
              }
            >
              Home
            </Link>
            <Link
              href="/live-auction"
              className={
                pathname === "/live-auction" ? styles.active : styles.inactive
              }
            >
              Live Auction
            </Link>
            <Link
              href="/wallet"
              className={
                pathname === "/wallet" ? styles.active : styles.inactive
              }
            >
              Wallet
              <Image src="/wallet.svg" width={16} height={15} alt="wallet" />
            </Link >

          </div >
        </div >
      </div >
    </>
  );
};
export default MobileMenu;

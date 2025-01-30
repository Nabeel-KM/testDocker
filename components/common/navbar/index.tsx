/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./navbar.module.scss";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import MobileMenu from "../MobileMenu";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai"
import { LiaWalletSolid } from "react-icons/lia"
import NotificationCompo from "../notification/Notification";
import DashboardMenu from "../dashboardMenu";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isProfile, setIsProfile] = useState(false)
  // This function is used for the Mobile Menu toggle.

  const mobileMenuHandler = () => {
    setIsProfile(!isProfile)
  };

  const handleNavigate = () => {
    router.push("/")
  }

  return (
    <div className={styles.wrapper}>
      <div className={classNames(["custom-class", styles.container])}>
        <div className={styles.logo}>
          <Link
            href="/"
          >
            <Image src={"/icon.svg"} className={styles.icon} width={108} height={42} alt="light Logo" />
          </Link>
        </div>

        <div className={styles.linkWrapper}>
          <div className={styles.links}>
            <Link
              href="/sell"
              className={
                pathname === "/sell" ? styles.active : styles.inactive
              }
            >
              <div className={styles.link}>
                <div className={styles.text}>Sell</div>
                <div className={styles.activeBar} />
              </div>
            </Link>
            <Link
              href="/live-auction"
              className={
                pathname === "/live-auction" ? styles.active : styles.inactive
              }
            >
              <div className={styles.link}>
                <div className={styles.text}>Live Auction</div>
                <div className={styles.activeBar} />
              </div>
            </Link>
            <Link
              href="/wallet"
              className={
                pathname === "/wallet" ? styles.active : styles.inactive
              }
            >
              <div className={styles.link}>
                <div className={styles.text}>
                  Wallet
                  <LiaWalletSolid className="text-[14px]" />
                </div>
                <div className={styles.activeBar} />
              </div>
            </Link>
            <Link
              href="/my-bids"
              className={
                pathname === "/my-bids" ? styles.active : styles.inactive
              }
            >
              <div className={styles.link}>
                <div className={styles.text}>
                  My Bids
                </div>
                <div className={styles.activeBar} />
              </div>
            </Link>
            <Link
              href="/my-property"
              className={
                pathname === "/my-property" ? styles.active : styles.inactive
              }
            >
              <div className={styles.link}>
                <div className={styles.text}>
                  My Property
                </div>
                <div className={styles.activeBar} />
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.LanguageAndLogin}>
          <Link href="/my-favourite" className={styles.heart}>
            <AiOutlineHeart className={styles.icon} />
          </Link>
          <Link href="/notification" className={styles.notification}>
            <NotificationCompo />
          </Link>
          {true ?
            <div className={styles.profile} onClick={() => mobileMenuHandler()}>
              <img src="/profileImage.png" alt="profile-image" />
              {isProfile && <DashboardMenu mobileMenuHandler={mobileMenuHandler} />}
            </div>
            :
            <button onClick={() => handleNavigate()}>
              <div className={styles.loginCircle} />
              Log in
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Navigation;

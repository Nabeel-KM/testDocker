"use client"
import { usePathname, useRouter } from "next/navigation";
import Footer from "../footer";
import Navigation from "../navbar";
import styles from "./layout.module.scss";

const Layout = ({ children }: any) => {
  const router = usePathname()
  console.log("🚀 ~ file: index.tsx:9 ~ Layout ~ router:", router)

  return (
    <>
      {router === "/" || router === "/otp-verification" ?
        <div className={styles.wrapper}>
          <div className="w-full flex flex-col items-center justify-start">{children}</div>
        </div>
        :
        <div className={styles.wrapper}>
          <Navigation />
          <div className="w-full flex flex-col items-center justify-start">{children}</div>
          <Footer />
        </div>
      }
    </>
  );
};

export default Layout;

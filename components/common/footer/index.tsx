"use client";
import React from "react";
import styles from "./footer.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { companyLinks, socialLinks, supportLinks } from "./data";

const Footer = () => {

  return (
    <div className={styles.bg}>
      <div className={classNames(["custom-class", styles.wrapper])}>
        <div className={styles.logoAndText}>
          <div className={styles.logo}>
            <Link
              href="/"
            >
              <Image src={"/icon.svg"} width={128} height={48} alt="Logo" />
            </Link>
          </div>
          <div className={styles.text}>
            Learn how to navigate the competitive world of property bidding and increase your chances of securing your dream home or investment property.
          </div>
        </div>
        <div className={styles.commonLinks}>
          <div className={styles.heading}>Company</div>
          <div className={styles.link}>
            {companyLinks.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                {item.name}
              </a>
            ))}

          </div>

        </div>
        <div className={styles.commonLinks}>
          <div className={styles.heading}>Support</div>
          <div className={styles.link}>
            {supportLinks.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                {item.name}
              </a>
            ))}

          </div>

        </div>
        <div className={styles.socialLinks}>
          <div className={styles.heading}>Get Connected</div>
          <div className={styles.link}>
            {socialLinks.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={index}
              >
                <item.icon className="lg:text-[18px] xl:text-[24px] text-[#2D383F] hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottomWrapper}>
        <p>Copyright &copy; {new Date().getFullYear()} Property Asia All Rights reserved.</p>
      </div>
    </div>

  );
};

export default Footer;

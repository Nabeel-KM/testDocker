import React from 'react'
import styles from "./dashboardMenu.module.scss"
import { MobileMenuList, deskTopMenuList } from './menuList';

interface Props {
  mobileMenuHandler: any;
}

const DashboardMenu = (props: Props) => {
  let { mobileMenuHandler } = props
  return (
    <div className={styles.wrapper}>
      <ul>
        {MobileMenuList.map((item, index) => (
          <li onClick={() => mobileMenuHandler()} key={index} className={styles.MobileMenuList}>
            {item.name}
          </li>
        ))}

        {deskTopMenuList.map((item, index) => (
          <li onClick={() => mobileMenuHandler()} key={index} className={styles.deskTopMenuList}>
            {item.name}
          </li>
        ))}


      </ul>
    </div>
  )
}

export default DashboardMenu
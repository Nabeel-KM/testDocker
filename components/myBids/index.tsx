import React from 'react'
import styles from "./myBids.module.scss"
import classNames from 'classnames'
import MyApartments from './myApartment'
const MyBidsComp = () => {
  return (
    <div className={classNames(["custom-class", styles.wrapper])}>
      <MyApartments />
    </div>
  )
}

export default MyBidsComp
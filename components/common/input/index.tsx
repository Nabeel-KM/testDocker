import React from "react";
import styles from "./input.module.scss";
import { LuWallet } from "react-icons/lu"
interface prop {
  img?: any;
  type?: string;
  placeholder?: string;
  value?: number | any;
  disable?: any;
  name?: string;
  Name?: string;
  onClick?: (prop: any) => any;
  config?: any;
  img2?: any;
  imgOnClick?: (prop: any) => any;
  // search?: never;
  wrapperStyle?: any;
  title?: string,
  error?: string
  Icontitle?: string
  bottomTitle?: string
}
const Input = (Props: prop) => {
  let {
    type,
    placeholder,
    value,
    disable,
    name,
    onClick,
    config,
    title,
    error,
    Icontitle,
    bottomTitle
  } = Props;
  const toSpread = config && config ? config : Props;
  return (
    <div className={styles.inputWrapper}>
      {title ? <span>{title} {Icontitle ? <label><LuWallet />{Icontitle}</label> : ""}</span> : ""}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disable}
        name={name}
        onClick={onClick}
        {...toSpread}
      />
      {error ? <p>{error}</p> : ""}
      {bottomTitle ? <div className={styles.bottomTitle}>Escrow 1% =<div className={styles.amount}>{bottomTitle} PKR</div></div> : ""}
    </div>
  );
};

export default Input;

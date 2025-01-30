import React, { useState } from "react";
import styles from "./bankDropdown.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { IoIosArrowDown } from "react-icons/io"


const CommondropDown = (props: any) => {
  const { selected, setSelected, options, showRightIcon, width, name } = props;
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {name ? <p className={styles.title}>{name}</p> : ""}
      <div className={styles.dropdown}>

        <div
          className={styles.dropdownbtn}
          onClick={(e) => setIsActive(!isActive)}
        >
          <span className={styles.selectedOptions}>
            {selected}
            <IoIosArrowDown />
          </span>
        </div>

        {isActive && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsActive(false);
            }}
          >
            <div className={styles.dropdowncontent}>
              {options?.map((option: any, index: number) => (
                <div
                  onClick={() => {
                    setSelected(option);
                    setIsActive(false);
                  }}
                  className={styles.dropdownitems}
                  key={index}
                >
                  {option}
                </div>
              ))}
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </>
  );
};

export default CommondropDown;

import React from "react";
import ReactPinInput from "react-pin-input";
import classNames from "classnames";
import styles from "./pinCode.module.scss";

export default class PinInputDelete extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
    };
  }

  quickReveal = (value, index) => {
    if (this)
      if (index == 0) {
        return;
      }
    document.querySelector(".pincode-input-container").children[
      index - 1
    ].type = "text";
    setTimeout(() => {
      document.querySelector(".pincode-input-container").children[
        index - 1
      ].type = "password";
    }, 200);
  };

  render() {
    const { code } = this.state;
    return (
      <div
        className={classNames(
          this.props.from === "settings" && styles.settings
        )}
      >
        <ReactPinInput
          length={4}
          initialValue=""
          focus={true}
          onChange={this.quickReveal}
          autoSelect="true"
          type="numeric"

          style={{ display: 'flex', columnGap: '10px', justifyContent: 'center' }}
          inputStyle={{
            width: '31px', height: '35px', padding: '0px',
            borderColor: "#DCDFE3",
            text: "#98A1AB",
            borderRadius: "5px",
            margin: "2px",
            color: "black",
            backgroundColor: 'white'
          }}
          inputFocusStyle={{ borderColor: "#2DC3C3" }}
          onComplete={(value, index) => {
            this.props.submit(value);
          }}
          isValid={true}
        />
      </div>
    );
  }
}



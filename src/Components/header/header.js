import React from "react";
import Styles from "./header.module.css";

export function Header() {
  return (
    <div className={Styles.root}>
      <span className={Styles.logo}>
        Web3<span className={Styles.logo2}>FrontEnd</span>
      </span>
      <div>
        <button className={Styles.connect_btn}>Connect Wallet</button>
      </div>
    </div>
  );
}
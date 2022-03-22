import React from "react";
import Connected from "../Connected/Connected";
import Styles from "./header.module.css";

export function Header({userInfo, connected, connectWallet}) {
  return (
    <div className={Styles.root}>
      <span className={Styles.logo}>
        Web3<span className={Styles.logo2}>FrontEnd</span>
      </span>
      <div className=''>
        {connected ? (
          <Connected
            matic_balance={userInfo.matic_balance}
            token_balance={userInfo.token_balance}
            address={userInfo.address}
          />
        ) : (
          <button onClick={connectWallet} className={Styles.connect_btn}>Connect Wallet</button>
        )}
      </div>
    </div>
  );
}

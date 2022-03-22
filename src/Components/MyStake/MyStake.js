import React from "react";
import Card from "./Card/Card";
import Styles from "./MyStake.module.css";

export default function MyStake() {
  return (
    <div className={Styles.root}>
      <h2 className={Styles.heading}>MyStake</h2>

      <div className={Styles.stake_body}>
        <div className={Styles.card_container}>
          <Card cardKey='total value' cardValue='5000' />
          <Card cardKey='Total Reward' cardValue='400' />
        </div>

        <form className={Styles.form}>
          <input
            type='number'
            className={Styles.input}
            placeholder='Amount to Stake'
          />
          <button type='submit' className={Styles.stake_btn}>
            Stake
          </button>
        </form>
        <form className={Styles.form}>
          <input
            type='number'
            className={Styles.input}
            placeholder='Amount to Stake'
          />
          <button type='submit' className={Styles.unstake_btn}>
            Unstake
          </button>
        </form>
      </div>
    </div>
  );
}

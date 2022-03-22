import React from "react";
import Card from "./Card/Card";
import Styles from "./MyStake.module.css";

export default function MyStake({
  stakeInput,
  onChangeInput,
  withdrawInput,
  onClickStake,
  onClickWithdraw,
  rewardAmount,
  stakeAmount,
}) {
  return (
    <div className={Styles.root}>
      <h2 className={Styles.heading}>MyStake</h2>

      <div className={Styles.stake_body}>
        <div className={Styles.card_container}>
          <Card cardKey='Total Staked' cardValue={stakeAmount} />
          <Card cardKey='Total Reward' cardValue={rewardAmount} />
        </div>

        <form onSubmit={onClickStake} className={Styles.form}>
          <input
            type='number'
            className={Styles.input}
            placeholder='Amount to Stake'
            value={withdrawInput}
            onChange={onChangeInput}
            id='stake'
          />
          <button type='submit' className={Styles.stake_btn}>
            Stake
          </button>
        </form>
        <form onSubmit={onClickWithdraw} className={Styles.form}>
          <input
            type='number'
            className={Styles.input}
            placeholder='Amount to Unstake'
            value={withdrawInput}
            onChange={onChangeInput}
            id='unstake'
          />
          <button type='submit' className={Styles.unstake_btn}>
            Unstake
          </button>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import Card from "./Card/Card";
import Styles from "./MyStake.module.css";
import clsx from "clsx";

export default function MyStake({
  stakeInput,
  onChangeInput,
  withdrawInput,
  onClickStake,
  onClickWithdraw,
  rewardAmount,
  stakeAmount,
  connected,
  totalStaked,
  totalReward
}) {
  return (
    <div className={Styles.root}>
      <h2 className={Styles.heading}>MyStake</h2>

      <div className={Styles.stake_body}>
        <div className={Styles.card_container}>
          <Card cardKey='Total Staked' cardValue={totalStaked} />
          <Card cardKey='Total Reward' cardValue={totalStaked} />
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
          <button type='submit' className={clsx({[Styles.stake_btn]: true, [Styles.btn_disabled]: !connected})} disabled={!connected}>
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
          <button type='submit' className={clsx({[Styles.unstake_btn]: true, [Styles.btn_disabled]: !connected})} disabled={!connected}>
            Unstake
          </button>
        </form>
      </div>
    </div>
  );
}

import React from "react";
// import Card from "./Card/Card";
import Styles from "./CheckStake.module.css";
import clsx from "clsx";

export default function CheckStake(
//     {
//     stakeInput,
//   onChangeInput,
//   withdrawInput,
//   onClickStake,
//   onClickWithdraw,
//   rewardAmount,
//   stakeAmount,
//   connected,
// }
) {
  return (
    <div className={Styles.root}>
      <h2 className={Styles.heading}>Check Stake</h2>

      <div className={Styles.stake_body}>
        <form className={Styles.form}>
          <input
            type='number'
            className={Styles.input}
            placeholder='Enter Address'
            // value={withdrawInput}
            // onChange={onChangeInput}
            id='stake'
          />
          <button type='submit' className={clsx({[Styles.check_stake]: true, [Styles.btn_disabled] : false})}>
            Stake
          </button>
        </form>
      </div>
    </div>
  );
}


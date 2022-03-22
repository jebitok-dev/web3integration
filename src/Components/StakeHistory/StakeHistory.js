import React from "react";
import Styles from "./StakeHistory.module.css";

export default function StakeHistory({stakeData}) {
  return (
    <div className={Styles.root}>
      <table className={Styles.root}>
        <thead className={Styles.table_header}>
          <tr className={Styles.table__head_row}>
            <th className={Styles.table_head_data}>S/N</th>
            <th className={Styles.table_head_data}>Amount Staked</th>
            <th className={Styles.table_head_data}>Account</th>
            <th className={Styles.table_head_data}>Time</th>
          </tr>
        </thead>
        <tbody>
          {stakeData.map((item, index) => {
            return (
              <tr className={Styles.table_row}>
                <td className={Styles.table_data}>{index + 1}</td>
                <td className={Styles.table_data}>{item.amount}</td>
                <td className={Styles.table_data}>{item.account}</td>
                <td className={Styles.table_data}>{item.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

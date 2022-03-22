import React from 'react';
import { utils } from 'ethers';
import {addressShortner} from "../../Utils/helpers";
import classes from "./Connected.module.css";

export default function Connected ({token_balance, matic_balance, address}){
  return (
    <div className={classes.root}>
        <div className={classes.token_bal}>{Number(utils.formatUnits(token_balance, 18)).toFixed(4)} BRT</div>
        <div className={classes.matic_bal}>{Number(utils.formatUnits(matic_balance, 18)).toFixed(4)} MATIC</div>
        <div className={classes.address}>{addressShortner(address, true)}</div>
    </div>
  )
}
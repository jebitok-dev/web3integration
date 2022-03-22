import React from 'react'
import Styles from "./Footer.module.css";

export default function Footer () {
  return (
    <div className={Styles.root}>
        <p className={Styles.text}>copyright &copy; Web3Bridge {new Date().getFullYear()}</p>
    </div>
  )
}


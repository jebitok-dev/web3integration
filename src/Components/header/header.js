import Styles from "./header.css";

export function Header() {
  return (
    <div className='Styles.root'>
      <p className='Styles.logo'>
        Web3<span className='Styles.logo2'>FrontEnd</span>
      </p>
      <div>
        <button className="Styles.connect_btn">Connect Wallet</button>
      </div>
    </div>
  );
}
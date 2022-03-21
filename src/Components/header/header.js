import Styles from "./header.css";

export function Header() {
  return (
    <div className='Styles.root'>
      <p className='logo'>
        Web3<span className='logo2'>FrontEnd</span>
      </p>
      <div>
        <button className="connect_btn">Connect Wallet</button>
      </div>
    </div>
  );
}
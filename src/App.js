import {useState} from "react";
import Footer from "./Components/Footer/Footer";
import {Header} from "./Components/header/header";
import MyStake from "./Components/MyStake/MyStake";
import StakeHistory from "./Components/StakeHistory/StakeHistory";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({
    matic_balance: 0,
    token_balance: 0,
    address: null,
  });

  const [stakeAmount, setStakeAmount] = useState(null);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [stakeInput, setStakeInput] = useState("");
  const [withdrawInput, setWithdrawInput] = useState("");

  const connectWallet = async () => {
    setConnected(true);
    setUserInfo({
      matic_balance: "672345678909934",
      token_balance: "123677793456798",
      address: "0x34d9297629323795CE29190159206cDD81e6B2d2",
    });
  };

  const [stakeHistory, setStakeHistory] = useState([
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
    },
  ]);

  const onChangeInput = ({target}) => {
    switch(target.id) {
      case "stake":
        setStakeInput(target.value)
        break;

      case "unstake":
        setWithdrawInput(target.value);
        break;

      default:
        break;
    }
  }

  const onClickStake = (e) => {
    e.preventDefault()
    console.log("staking....", stakeInput)
  }

  const onClickWithdraw = (e) => {
    e.preventDefault()
    console.log("unstaking....", withdrawInput);
  }

  return (
    <div>
      <Header
        connectWallet={connectWallet}
        connected={connected}
        userInfo={userInfo}
      />
      <main className='main'>
        <MyStake
          stakeInput={stakeInput}
          withdrawInput={withdrawInput}
          onChangeInput={onChangeInput}
          onClickStake={onClickStake}
          onClickWithdraw={onClickWithdraw}
          stakeAmount={stakeAmount}
          rewardAmount={rewardAmount}
        />
        <StakeHistory stakeData={stakeHistory} />
      </main>
      <Footer />
    </div>
  );
}

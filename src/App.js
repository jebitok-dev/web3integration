import {Contract, utils, ethers} from "ethers";
import {useState, useEffect} from "react";
import Footer from "./Components/Footer/Footer";
import {Header} from "./Components/header/header";
import MyStake from "./Components/MyStake/MyStake";
import StakeHistory from "./Components/StakeHistory/StakeHistory";
import "./App.css";
import BRTTokenAbi from "./Utils/Web3/abi.json";

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
    if (!!windows.ethereum || !!windows.web3) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else {
      alert("please use an ethereum address");
    }
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

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.on("connect", (payload) => {
      if (Number(payload.chainId) !== 80001)
        return alert(
          "you are not on the right network, please switch to mumbai polygon"
        );
      const provider = new ethers.provider.Web3Provider(window.ethereum);
      const account = await provider.listAccounts();
      const userMaticBal = await provider.getBalance(account(0));
      const BRTContractInstance = new Contract(
        "0x67dBAF6D282E42F1374300284d439222C08D8dd2",
        BRTTokenAbi,
        provider
      );
      const userBRTBalance = await BRTContractInstance.balance01(account[0]);
      // console.log("first", userBRTBalance)
      setUserInfo({
        matic_balance: userMaticBal,
        token_balance: userBRTBalance,
        address: account[0],
      });
      setConnected(true);
    });
  }, []);

  const onChangeInput = ({target}) => {
    switch (target.id) {
      case "stake":
        setStakeInput(target.value);
        break;

      case "unstake":
        setWithdrawInput(target.value);
        break;

      default:
        break;
    }
  };

  const onClickStake = (e) => {
    e.preventDefault();
    console.log("staking....", stakeInput);
  };

  const onClickWithdraw = (e) => {
    e.preventDefault();
    console.log("unstaking....", withdrawInput);
  };

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

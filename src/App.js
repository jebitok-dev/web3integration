import {Contract, utils, ethers} from "ethers";
import {useState, useEffect} from "react";
import Footer from "./Components/Footer/Footer";
import {Header} from "./Components/header/header";
import MyStake from "./Components/MyStake/MyStake";
import StakeHistory from "./Components/StakeHistory/StakeHistory";
import "./App.css";
import BRTTokenAbi from "./Utils/Web3/abi.json";
import CheckStake from "./Components/CheckStake/CheckStake";
const BRTTokenAddress = "0x169E82570feAc981780F3C48Ee9f05CED1328e1b";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({
    matic_balance: 0,
    token_balance: 0,
    address: null,
  });

  // the amount of token the user have staked
  const [stakeAmount, setStakeAmount] = useState(null);
  // the amount of reward the user has accumulated on his stake
  const [rewardAmount, setRewardAmount] = useState(null);
  // the value of token the user wants to stake
  const [stakeInput, setStakeInput] = useState("");
  // the value of token the user wants to withdraw
  const [withdrawInput, setWithdrawInput] = useState("");
  // all stake history data displayed on the history table
  const [stakeHistory, setStakeHistory] = useState([]);

  const connectWallet = async () => {
    if (!!window.ethereum || !!window.web3) {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else {
      alert("please use an ethereum address");
    }
  };

  // handler function getting the matic & token balance given an address
  const getAccountDetails = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const userMaticBal = await provider.getBalance(address);
      const BRTContractInstance = new Contract(
        BRTTokenAddress,
        BRTTokenAbi,
        provider
      );
      const userBRTBalance = await BRTContractInstance.balanceOf(address);
    } catch (err) {
      console.log(err);
    }
  };
  // handler for when a user switches from one account to another or completely disconnected
  const handleAccountChanged = async (accounts) => {
    if (!!accounts.length) {
      const networkId = await window.ethereum.request({method: "eth_chainId"});
      if (Number(networkId) !== 80001) return;
      const accountDetails = await getAccountDetails(accounts[0]);

      setUserInfo({
        matic_balance: accountDetails.userMaticBal,
        token_balance: accountDetails.userBRTBalance,
        address: accounts[0],
      });
      setConnected(true);
    } else {
      setConnected(false);
      setUserInfo({
        matic_balance: 0,
        token_balance: 0,
        address: null,
      });
    }
  };

  // handler function for chain/network changed
  const handleChainChanged = async (chainId) => {
    if (Number(chainId) !== 80001) {
      setConnected(false);
      setUserInfo({
        matic_balance: 0,
        token_balance: 0,
        address: null,
      });
      return alert(
        "You are connected to the wrong network, please switch to Polygon Mumbai"
      );
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if(!accounts.length) return
      const accountDetails = await getAccountDetails(accounts[0])
      setUserInfo({
        matic_balance: accountDetails.userMaticBal,
        token_balance: accountDetails.userBRTBalance,
        address: accounts[0],
      });
      setConnected(true);
    }
  };

  // an handler function to eagerly connect user and fetch their data
  const eagerConnect = async () => {
    const networkId = await window.ethereum.request({method: "eth_chainId"});
    if (Number(networkId) !== 80001) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (!accounts.length) return;
    const accountDetails = await getAccountDetails(accounts[0]);
    setUserInfo({
      matic_balance: accountDetails.userMaticBal,
      token_balance: accountDetails.userBRTBalance,
      address: accounts[0],
    });
    setConnected(true);
  };

  const init = async () => {
    const customProvider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_RPC_URL
    );
    const BRTContractInstance = new Contract(
      BRTTokenAddress,
      BRTTokenAbi,
      customProvider
    );
    const stakeHistory = await BRTContractInstance.queryFilter("stakeEvent");
    const history = [];

    stakeHistory.forEach((data) => {
      history.unshift({
        amount: data.args[1],
        account: data.args[0],
        time: data.args[2].toString(),
        type: data.args[3],
      });
    });
    stakeHistory(history);
    BRTContractInstance.on("stakeEvent", (account, amount, time, type) => {
      const newStake = {
        amount: amount,
        account: account,
        time: time.toString(),
        type: type,
      };
      setStakeHistory((prev) => [newStake, ...prev]);
    });
  };

  useEffect(() => {
    if (!window.ethereum) return;
    // binding handlers to wallet events we care about
    window.ethereum.on("connect", eagerConnect);
    window.ethereum.on("accountsChanged", handleAccountChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
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

  const onClickStake = async(e) => {
    e.preventDefault();
    // console.log("staking....", stakeInput);
    if (stakeInput < 0) return alert("you cannot stake less than 0 BRT");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const BRTContractInstance = new Contract(
      BRTTokenAddress,
      BRTTokenAbi,
      signer
    );
    const weiValue = utils.parseEther(stakeInput);
    const stakeTx = await BRTContractInstance.stakeBRT(weiValue);
    const stakeTxHash = await provider.getTransaction(stakeTx.hash);
    const response = await stakeTx.wait();
    const address = response.events[1].args[1].toString();
    const amountStaked = response.events[1].args[1].toString();
    const time = response.events[1].args[2].toString();
  };

  const onClickWithdraw = (e) => {
    e.preventDefault();
    if(withdrawInput < 0) return alert("you cannot withdraw less than 0 rewardToken");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const BRTContractInstance = new Contract(
      BRTTokenAddress,
      BRTTokenAbi,
      signer
    );
    const rewardToken = utils.parseEther(withdrawReward);
    const withdrawReward = await BRTContractInstance.withdraw(rewardToken);
    const withdrawRewardHash = await provider.getTransaction(withdrawReward.hash);
    const response = await withdrawReward.wait();
    const address = response.events[1].args[1].toString();
    const withdrawAmount = response.events[1].args[1].toString();
    const time = response.events[1].args[2].toString();
  };

  return (
    <div className='App'>
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
          connected={connected}
        />
        <StakeHistory stakeData={stakeHistory} />
        <CheckStake />
      </main>
      <Footer />
    </div>
  );
}

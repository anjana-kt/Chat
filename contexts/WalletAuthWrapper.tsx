import {
  FC,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";
import { networks } from "../utils/networks";
//   import contractAbi from "../utils/contractAbi.json";
//   import { SupplyChainContract } from "../utils/SupplyChainContract";

interface WalletAuthContextType {
  user: string | null | undefined;
  setUser: Dispatch<SetStateAction<string | null | undefined>>;
  // userData: UserProfile | null;
  // setUserData: Dispatch<SetStateAction<UserProfile | null>>;
  // contract?: SupplyChainContract;
  connectWallet: () => Promise<void>;
}

const WalletAuthContext = createContext<WalletAuthContextType | null>(null);

const WalletAuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  // states
  const [user, setUser] = useState<string | null | undefined>(undefined);
  // const [userData, setUserData] = useState<UserProfile | null>(null);
  const [provider, setProvider] = useState<Web3Provider>();
  const [network, setNetwork] = useState("");
  // const [contract, setContract] = useState<SupplyChainContract>();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      console.log("Connected", accounts[0]);
      setUser(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      setUser(null);
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
      const provider = new ethers.providers.Web3Provider(
        ethereum as unknown as ExternalProvider
      );
      setProvider(provider);
    }

    const accounts = (await ethereum.request({
      method: "eth_accounts",
    })) as string[];

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setUser(account);
    } else {
      console.log("No authorized account found");
      setUser(null);
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    // @ts-ignore
    setNetwork(networks[chainId]);

    ethereum.on("chainChanged", handleChainChanged);

    // Reload the page when they change networks
    // @ts-ignore
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        // @ts-ignore
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // connect contract
  //   useEffect(() => {
  //     if (user && !contract) {
  //       const signer = provider?.getSigner();
  //       const supplyChainContract = new ethers.Contract(
  //         process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  //         contractAbi.abi,
  //         signer
  //       ) as unknown as SupplyChainContract;

  //       setContract(supplyChainContract);

  //       let tempUserData: UserProfile = {
  //         walletKey: user,
  //         balance: "0",
  //       };

  //       supplyChainContract.users(user).then((val) => {
  //         if (val.name !== "")
  //           tempUserData = {
  //             ...tempUserData,
  //             name: val.name,
  //             type: val.uType ? "Supplier" : "Manufacturer",
  //           };

  //         provider?.getBalance(user).then((bal) => {
  //           tempUserData = {
  //             ...tempUserData,
  //             balance: Number(ethers.utils.formatEther(bal)).toFixed(3),
  //           };

  //           setUserData(tempUserData);
  //         });
  //       });
  //     }
  //   }, [provider, user, contract, router]);

  // get user details from contract

  return (
    <WalletAuthContext.Provider
      value={{
        user,
        setUser,
        // userData,
        // setUserData,
        //   contract,
        connectWallet,
      }}
    >
      {children}
    </WalletAuthContext.Provider>
  );
};

export default WalletAuthWrapper;
export { WalletAuthContext };
export type { WalletAuthContextType };

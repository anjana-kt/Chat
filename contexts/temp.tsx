import { ethers } from "ethers";
import { createContext, useState, useEffect, ReactNode, FC } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { Web3Provider } from "@ethersproject/providers";

interface WalletAuthContextType {
  user: string | null | undefined;
  // userData: UserProfile | null;
  // setUserData: Dispatch<SetStateAction<UserProfile | null>>;
  // contract?: SupplyChainContract;
  connectWallet: () => Promise<void>;
}

const WalletAuthContext = createContext<WalletAuthContextType | null>(null);

const WalletAuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { ethereum } = window;
  const [provider, setProvider] = useState<Web3Provider>();

  const [user, setUser] = useState<null | string>(null);

  useEffect(() => {
    const socialLoginSDK = new SocialLogin();
    const checkIfWalletIsConnect = async () => {
      try {
        await socialLoginSDK.init("0x13881"); // Enter the network id in hex parameter
        socialLoginSDK.showConnectModal();

        // show connect modal
        socialLoginSDK.showWallet();
        if (!socialLoginSDK?.web3auth?.provider) {
          alert("Provider not found");
          return;
        } else {
          console.log(socialLoginSDK.web3auth.provider);
        }

        let provider = new ethers.providers.Web3Provider(
          socialLoginSDK.web3auth.provider
        );
        setProvider(provider);
        const accounts = await provider.listAccounts();
        console.log("EOA address", accounts);
        setUser(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    };

    checkIfWalletIsConnect();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      setUser(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
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
    switchNetwork();
  }, []);

  return (
    <WalletAuthContext.Provider
      value={{
        user,
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

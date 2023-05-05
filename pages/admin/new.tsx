import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ethers } from "ethers";
import RingSpinner from "../../components/loaders/ringSpinner";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/WalletAuthWrapper";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";

const Admin: FC = () => {
  const [provider, setProvider] = useState<Web3Provider>();

  const { contract } = useContext(WalletAuthContext) as WalletAuthContextType;
  const checkIfWalletIsConnected = async (): Promise<number | undefined> => {
    return provider?.listAccounts().then((accounts) => {
      if (accounts.length > 0) {
        console.log(`Wallet is connected with address: ${accounts[0]}`);
        return 1;
      } else {
        console.log("Wallet is not connected");
        return 0;
      }
    });
  };
  useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      // window.ethereum is defined
      setProvider(
        new ethers.providers.Web3Provider(
          window.ethereum as unknown as ExternalProvider,
        ),
      );
    } else {
      // window.ethereum is undefined
      console.log();
    }
  }, []);

  return <></>;
};

export default Admin;

import styles from "../styles/Home.module.css";
import { Chat } from "@pushprotocol/uiweb";
import React,{useEffect,useState} from "react"
import {ethers} from "ethers"

export default function Home() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [devAccount, setDevAccount] = useState("");

    
   useEffect(() => {
    (window as any).ethereum .request({ method: "eth_requestAccounts", })
   .then((accounts : string[]) => { setCurrentAccount(accounts[0]);console.log(accounts[0]); }) 
   .catch((error: any) => { alert(`Something went wrong: ${error}`); });
   
   }, [])
    
  
  return (
    <div className={styles.container}>

          <h2 className="p-10 bg-opacity-20 rounded-3xl text-xl">Did you like the service ?</h2>
          <button className="p-5 bg-white bg-opacity-20 rounded-3xl text-m m-2">
            YES
          </button>
          <button className="p-5 bg-white bg-opacity-20 rounded-3xl text-m m-2">
            NO
          </button>

      <main className={styles.main}>
        <Chat
          account={currentAccount}//user address
          supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
          modalTitle="Help line"
          env="staging"
        />
      </main>
    </div>
  );
}
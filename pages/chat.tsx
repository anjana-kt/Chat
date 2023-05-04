import styles from "../styles/Home.module.css";
import { Chat } from "@pushprotocol/uiweb";

export default function Home() {
  return (
    <div className={styles.container}>

          <h2 className="p-10 bg-opacity-20 rounded-3xl text-xl">Did you like the service ?</h2>
          <button className="p-5 bg-white bg-opacity-20 rounded-3xl text-m m-5">
            YES
          </button>
          <button className="p-5 bg-white bg-opacity-20 rounded-3xl text-xl">
            NO
          </button>

      <main className={styles.main}>
        <Chat
          account="0x7ffC260ef58905e9a8F462a4C9b838c21352FF90" //user address
          supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
          apiKey="xkxLiG74pc.A3n2bD4wWFNafRerPJSx1qj2KMRnmhuoFgsxCJIOzRezxmCgmv5Xc7bqhKLRCTVQ"
          modalTitle="Help line"
          env="staging"
        />
      </main>
    </div>
  );
}
import styles from "../../styles/Home.module.css";
import { Chat } from "@pushprotocol/uiweb";
import { useRouter } from "next/router";
import Axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../components/baseUrl";


export default function Support() {
  const router = useRouter();
  const { id } = router.query;
  const [supporter, setSupporter] = useState(null);
  const [request, setRequest] = useState([]);

  // useEffect(() => {
  //   Axios.get(`${baseUrl}/api/get_request?id=${id}`)
  //     .then((res) => {
  //       setRequest(res.data);
  //       // console.log();
  //     })
      
  //     setTimeout(10000, () => {
  //       console.log("Hello")
  //       setSupporter(res.data[0]["supporter_address"]);
  //       console.log(supporter)

  //     });
  // }, []);

  return (
    <>
      
        <div className={styles.container}>
          
          <h5 className="p-10 bg-opacity-50 rounded-3xl text-xl">
            Waiting for supporter to connect... Refresh periodically
          </h5>
          <h2 className="p-10 bg-opacity-20 rounded-3xl text-xl">
            Did you like the service for request id: {id})?
          </h2>
          <button className="p-5 bg-white bg-opacity-20 rounded-3xl text-m m-5">
            YES
          </button>
          <button className="p-5 bg-white bg-opacity-20 rounded-3xl text-xl">
            NO
          </button>

          <main className={styles.main}>
            <Chat
              account="0x4be5ed1f1087015a10a37bed15fe70b7c23e182e" //user address
              supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d"//support address
              apiKey="xkxLiG74pc.A3n2bD4wWFNafRerPJSx1qj2KMRnmhuoFgsxCJIOzRezxmCgmv5Xc7bqhKLRCTVQ"
              modalTitle="Help line"
              env="staging"
            />
          </main>
        </div>
   
   </>
  );
}

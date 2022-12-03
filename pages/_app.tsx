import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import WalletAuthWrapper from "../contexts/WalletAuthWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletAuthWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletAuthWrapper>
  );
}

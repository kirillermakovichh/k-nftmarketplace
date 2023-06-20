import { SignerProvider } from "@/state/signer";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SignerProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SignerProvider>
  );
};

export default MyApp;

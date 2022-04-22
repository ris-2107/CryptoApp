import "../styles/globals.css";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SnackbarProvider } from "notistack";

const supportedChainsIds = [4];
const connectors = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <ThirdwebWeb3Provider
        supportedChainsIds={supportedChainsIds}
        connectors={connectors}
      >
        <Component {...pageProps} />
      </ThirdwebWeb3Provider>
    </SnackbarProvider>
  );
}

export default MyApp;

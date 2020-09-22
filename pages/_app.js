import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import ActiveState from "../context/activeState";

function MyApp({ Component, pageProps }) {
  return (
    <ActiveState>
      <Component {...pageProps} />
    </ActiveState>
  );
}

export default MyApp;

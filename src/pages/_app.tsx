import '../styles/global.scss';
import Header from "../components/Header/Header";
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div className="pageContainer">
      {/* <Header /> */}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

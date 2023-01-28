import '../styles/global.scss';
import Header from "../components/Header/Header";
import { useWindowSize } from '@react-hook/window-size';
import { useSsrCompatible } from '../helpers/useSsrCompatible';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [width, height] = useSsrCompatible(useWindowSize(), [0, 0]);

  return (
    <div className="pageContainer">
      <Header />
      <Component {...pageProps} width={width} height={height}/>
    </div>
  )
}

export default MyApp

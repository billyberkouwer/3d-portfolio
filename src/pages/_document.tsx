import Preloads from '@/resources/preload'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <title>3D - Billy Myles-Berkouwer</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Billy Myles-Berkouwer is a web developer and visual artist. See his experiments in 3D software here." />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="portfolio" />
          <meta property="og:title" content="3D - Billy Myles-Berkouwer" />
          <meta property="og:description" content="Billy Myles-Berkouwer is a web developer and visual artist. See his experiments in 3D software here" />
          <meta property="og:site_name" content="3D - Billy Myles-Berkouwer" />
          <link rel="canonical" href="https://3d.billyberkouwer.dev" />
          <Preloads />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

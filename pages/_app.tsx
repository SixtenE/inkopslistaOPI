import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import Head from 'next/head'

const theme = extendTheme({
  fonts: {
    body: `'Roboto', sans-serif`,
  },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Inköpslista</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="./mausip.png"></link>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
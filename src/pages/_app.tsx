import React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { AppProps } from 'next/app'
import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <React.Fragment>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID ?? ''} />
    </React.Fragment>
  )
}

export default App

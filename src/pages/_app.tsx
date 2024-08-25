import React from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { AppProps } from 'next/app'
import 'styles/globals.css'
import { AuthProvider } from 'context/authContext'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<React.Fragment>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID ?? ''} />
		</React.Fragment>
	)
}

export default App

import { Head, Html, Main, NextScript } from 'next/document'
import { rubik } from 'components/Layouts/Providers/FontProvider'

const Document = () => (
	<Html lang='en' className='bg-zinc-100'>
		<Head />
		<body
			className={`selection:bg-zinc-900/20 ${rubik.variable} font-sans antialiased`}
		>
			<Main />
			<NextScript />
		</body>
	</Html>
)

export default Document

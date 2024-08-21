import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en" className='bg-zinc-100'>
    <Head />
    <body className='selection:bg-zinc-900/20'>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document

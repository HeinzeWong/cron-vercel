import type { AppProps } from 'next/app'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { Analytics } from '@vercel/analytics/react'

import { getLayout } from '@vercel/examples-ui'
import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <div
    >
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}

export default App

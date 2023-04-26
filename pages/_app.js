import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import Layout from '../layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    )
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#0984e3' } }}>
      <Layout isMobile={isMobile}>
        <Component {...pageProps} isMobile={isMobile} />
      </Layout>
    </ConfigProvider>
  )
}

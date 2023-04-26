import { useRouter } from 'next/router'
import Head from 'next/head'
import { Layout, theme, Typography, Space, Button, Badge } from 'antd'
import {
  ShoppingCartOutlined,
  LoginOutlined,
} from '@ant-design/icons'
import { HookSwr } from '@/lib/hooks/HookSwr'

const { Title } = Typography
const { Header, Content } = Layout

const LayoutApp = ({ children, isMobile }) => {
  const router = useRouter()
  const { data: userDetail, isLoading } = HookSwr({
    path: '/user/me',
  })
  const {
    token: { colorBgContainer, paddingMD },
  } = theme.useToken()

  return (
    <>
      <Head>
        <title>E-Commerce App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <Layout>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: paddingMD,
              background: colorBgContainer,
            }}
          >
            <Title style={{ margin: 0, padding: 0 }} level={4}>
              E-COMMERCE
            </Title>
            <Space size="middle">
              <Badge count={0} showZero>
                <Button icon={<ShoppingCartOutlined />} />
              </Badge>
              <Button icon={<LoginOutlined />}>Masuk</Button>
            </Space>
          </Header>
          <Content
            className="content-dashboard"
            style={{
              overflowY: 'scroll',
              padding: paddingMD,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default LayoutApp

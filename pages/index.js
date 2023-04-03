import { Row, Col, Card } from 'antd'
// import { HookSwr } from '@/lib/hooks/HookSwr'

export default function Home({ isMobile }) {
  // const { data: dataCharts } = HookSwr({ path: '/pegawai/charts' })

  return (
    <>
      <Row gutter={[14, 14]} style={{ marginBottom: '15px' }}>
        <Col span={6}>
          <Card bordered={false}>
            test
          </Card>
        </Col>
      </Row>
    </>
  )
}

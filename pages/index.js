/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'antd'
import { HookSwrApi } from '@/lib/hooks/HookSwrApi'

export default function Home({ isMobile }) {
  const {
    data: dataProducts,
    isLoading,
    reloadData,
  } = HookSwrApi({
    path: '/products',
    query: '?limit=10&skip=0',
  })
  const [listProduct, setListProducts] = useState([])

  useEffect(() => {
    if (dataProducts) {
      setListProducts((listProduct) => [
        ...listProduct,
        ...dataProducts?.products,
      ])
    }
  }, [dataProducts])

  return (
    <>
      <Row gutter={[14, 14]} style={{ marginBottom: '15px' }}>
        {listProduct?.map((product) => (
          <Col span={isMobile ? 24 : 6} key={product?.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={`list-image-${product?.id}`}
                  src={product?.images?.[0] ?? product?.thumbnail}
                />
              }
            >
              <Card.Meta
                title={product?.title}
                description={product?.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Button
          type="primary"
          onClick={() =>
            reloadData(`?limit=10&skip=${listProduct.length}`)
          }
          loading={isLoading}
          disabled={dataProducts?.total === listProduct.length}
        >
          Load more
        </Button>
      </Row>
    </>
  )
}

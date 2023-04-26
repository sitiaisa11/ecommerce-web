/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { StarFilled } from '@ant-design/icons'
import { Row, Col, Card, Button, Badge, Space } from 'antd'
import { HookSwrApi } from '@/lib/hooks/HookSwrApi'
import { idrCurrency, discountPrice } from '@/helpers/utils'

export default function Home({ isMobile }) {
  const {
    data: dataProducts,
    isLoading,
    reloadData,
  } = HookSwrApi({
    path: '/produk',
    query: '?limit=12&page=1',
  })
  const [listProduct, setListProducts] = useState([])
  const [currentPage, setCurrentPage] = useState()

  useEffect(() => {
    if (dataProducts) {
      setListProducts((listProduct) => [
        ...listProduct,
        ...dataProducts?.data,
      ])
      setCurrentPage(dataProducts?.current_page)
    }
  }, [dataProducts])

  return (
    <>
      <Row gutter={[14, 14]} style={{ marginBottom: '15px' }}>
        {listProduct?.map((product) => (
          <Col span={isMobile ? 24 : 4} key={product?.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={`list-image-${product?.id}`}
                  src={product?.images?.[0] ?? product?.thumbnail}
                  height="150"
                  loading="lazy"
                />
              }
            >
              <Card.Meta
                title={product?.title}
                description={
                  <>
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    >
                      {idrCurrency(
                        product?.discount_percentage
                          ? discountPrice(
                              product?.price,
                              product?.discount_percentage,
                            )
                          : product?.price,
                      )}
                    </p>
                    {product?.discount_percentage && (
                      <Space>
                        <Badge
                          count={`${product?.discount_percentage}%`}
                          color="green"
                        />
                        <span
                          style={{ textDecoration: 'line-through' }}
                        >
                          {idrCurrency(product?.price)}
                        </span>
                      </Space>
                    )}
                    <p style={{ margin: 0, padding: 0 }}>
                      <Space>
                        <span>
                          <StarFilled style={{ color: '#FFC400' }} />
                          {product?.rating}
                        </span>
                      </Space>
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => {
            setCurrentPage(currentPage + 1)
            reloadData(`?limit=12&page=${currentPage + 1}`)
          }}
          loading={isLoading}
          disabled={dataProducts?.total === listProduct.length}
        >
          Load more
        </Button>
      </Row>
    </>
  )
}

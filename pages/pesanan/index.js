import {
  Card,
  List,
  Button,
  Avatar,
  Row,
  Col,
  Statistic,
  Steps,
  notification,
} from 'antd'
import { StarFilled, CheckCircleOutlined } from '@ant-design/icons'
import { HookSwr } from '@/lib/hooks/HookSwr'
import orderStatus from '@/helpers/orderStatus'
import { mutationApi, idrCurrency } from '@/helpers/utils'
import { NUMBER_STATUS } from '@/constants'
import dayjs from 'dayjs'

export default function Pesanan({ isMobile }) {
  const { data, isLoading, reloadData } = HookSwr({
    path: '/pesanan',
  })

  const finishPesanan = ({ id }) => {
    mutationApi({
      endpoint: '/pesanan/finish',
      payload: {
        id,
      },
    })
      .then((res) => {
        notification.success({
          message: 'Info',
          description: res?.data?.message,
          duration: 1,
        })
        reloadData('')
      })
      .catch((err) => {
        if ([400].includes(err?.response?.status)) {
          notification.warning({
            message: err?.response?.data?.message,
            description: JSON.stringify(err?.response?.data?.data),
            duration: 1,
          })
        }
        if ([500].includes(err?.response?.status)) {
          notification.error({
            message: 'Error',
            description: err?.response?.statusText,
            duration: 1,
          })
        }
      })
  }

  return (
    <Card title="Pesanan" bordered={false}>
      <List
        className="list-pesanan"
        loading={isLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data?.data}
        renderItem={(item) => (
          <List.Item>
            <Row gutter={[10, 10]} style={{ width: '100%' }}>
              <Col span={isMobile ? 24 : 20}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item?.produk?.images?.[0] ??
                        item?.produk?.thumbnail
                      }
                    />
                  }
                  title={<span>{item?.produk?.title}</span>}
                  description={
                    <>
                      <Row gutter={[10, 10]}>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Invoice ID"
                            value={item?.id}
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Tanggal Dipesan"
                            value={dayjs(item?.created_at).format(
                              'DD MMMM YYYY',
                            )}
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Brand"
                            value={item?.produk?.brand}
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Category"
                            value={item?.produk?.category}
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Rating"
                            value={item?.produk?.rating}
                            valueStyle={{ fontSize: '16px' }}
                            prefix={
                              <StarFilled
                                style={{ color: '#FFC400' }}
                              />
                            }
                          />
                        </Col>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Status"
                            value="+"
                            prefix={orderStatus(item?.status)}
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col span={isMobile ? 24 : 6}>
                          <Statistic
                            title="Total Price"
                            value={idrCurrency(item?.total_price)}
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginTop: '20px' }}>
                        <Steps
                          direction={
                            isMobile ? 'vertical' : 'horizontal'
                          }
                          size="small"
                          current={
                            NUMBER_STATUS?.[item?.status] ??
                            NUMBER_STATUS?.hold
                          }
                          items={[
                            {
                              title: 'Hold',
                              // description:
                              //   'Proses pesanan dimasukkan kedalam keranjang',
                            },
                            {
                              title: 'Menunggu Pembayaran',
                              // description:
                              //   'Lunasi pesanan melalui metode pembayaran yang tersedia',
                            },
                            {
                              title: 'Pesanan Dikirim',
                              // description:
                              //   'Pesanan dalam proses pengiriman ekspedisi',
                            },
                            {
                              title: 'Pesanan Selesai',
                              // description:
                              //   'Pesanan selesai, produk telah diterima pembeli',
                            },
                          ]}
                        />
                      </Row>
                    </>
                  }
                />
              </Col>
              <Col span={isMobile ? 24 : 4}>
                {item?.status === 'delivery' && (
                  <Button
                    type="primary"
                    key="list-selesaikan-pesanan"
                    icon={<CheckCircleOutlined />}
                    onClick={() => finishPesanan({ id: item?.id })}
                    size={isMobile ? 'small' : 'middle'}
                  >
                    Selesaikan Pesanan
                  </Button>
                )}
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  )
}

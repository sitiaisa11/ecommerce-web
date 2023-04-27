import { Card, Table, Space, Button, notification } from 'antd'
import {
  CheckSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { HookSwr } from '@/lib/hooks/HookSwr'
import { idrCurrency, mutationApi } from '@/helpers/utils'

export default function Keranjang() {
  const { data, isLoading, reloadData } = HookSwr({
    path: '/pesanan/cart',
  })
  const { reloadData: reloadDataCart } = HookSwr({
    path: '/pesanan/cart/count',
  })

  const processCart = ({ id }) => {
    mutationApi({
      endpoint: '/pesanan/cart/process',
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
        reloadDataCart('')
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

  const columns = [
    {
      title: 'Nama Produk',
      key: 'produk',
      dataIndex: 'produk',
      render: (produk) => produk?.title || '-',
    },
    {
      title: 'Category',
      key: 'produk',
      dataIndex: 'produk',
      render: (produk) => produk?.category || '-',
    },
    {
      title: 'Brand',
      key: 'produk',
      dataIndex: 'produk',
      render: (produk) => produk?.brand || '-',
    },
    {
      title: 'Stock',
      key: 'produk',
      dataIndex: 'produk',
      render: (produk) => produk?.stock || '-',
    },
    {
      title: 'Qty',
      key: 'qty',
      dataIndex: 'qty',
      render: (qty) => qty || '-',
    },
    {
      title: 'Discount Price',
      key: 'discount_price',
      dataIndex: 'discount_price',
      render: (discount_price) => idrCurrency(discount_price) || '-',
    },
    {
      title: 'Total Price',
      key: 'total_price',
      dataIndex: 'total_price',
      render: (total_price) =>
        (
          <span style={{ fontWeight: 'bold' }}>
            {idrCurrency(total_price)}
          </span>
        ) || '-',
    },
    {
      title: 'Aksi',
      render: (item) => (
        <Space direction="vertical">
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={() => processCart({ id: item?.id })}
          >
            Proses Pesanan
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Card
      title="Keranjang"
      bordered={false}
      extra={
        <Space key="action-keranjang">
          {data?.data?.length > 0 && (
            <Button
              icon={<CheckSquareOutlined />}
              onClick={() =>
                processCart({
                  id: data?.data?.map((item) => item.id),
                })
              }
            >
              Proses Semua Pesanan
            </Button>
          )}
        </Space>
      }
    >
      <Table
        rowKey="key"
        dataSource={data?.data}
        columns={columns}
        loading={isLoading}
        style={{ width: '100%' }}
        scroll={{ x: 425 }}
      />
    </Card>
  )
}

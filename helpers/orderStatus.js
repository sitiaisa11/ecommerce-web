import { Tag } from 'antd'
import {
  MinusCircleOutlined,
  HistoryOutlined,
  CarOutlined,
  DropboxOutlined,
} from '@ant-design/icons'

const orderStatus = (status) => {
  const tmp = {
    hold: (
      <Tag color="default" icon={<MinusCircleOutlined />}>
        Hold
      </Tag>
    ),
    'waiting-payment': (
      <Tag color="processing" icon={<HistoryOutlined />}>
        Menunggu Pembayaran
      </Tag>
    ),
    delivery: (
      <Tag color="purple" icon={<CarOutlined />}>
        Pesanan Dikirim
      </Tag>
    ),
    done: (
      <Tag color="success" icon={<DropboxOutlined />}>
        Pesanan Selesai
      </Tag>
    ),
  }
  return tmp[status] ?? tmp.hold
}

export default orderStatus

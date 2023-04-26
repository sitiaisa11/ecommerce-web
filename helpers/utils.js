import Cookies from 'js-cookie'
import Axios from 'axios'

export const getMeApi = async ({ token }) => {
  try {
    const result = await Axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_API}/user/me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const authApi = async ({ endpoint, payload }) => {
  try {
    const result = await Axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      data: payload,
    })
    return result
  } catch (error) {
    throw error
  }
}

export const logoutApi = async () => {
  try {
    const result = await Axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_API}/logout`,
      headers: {
        Authorization: `Bearer ${Cookies.get('token_user')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const mutationApi = async ({
  method = 'POST',
  payload,
  endpoint,
}) => {
  try {
    const result = await Axios({
      method: method,
      url: `${process.env.NEXT_PUBLIC_API}${endpoint}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${Cookies.get('token_user')}`,
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

export const idrCurrency = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

export const discountPrice = (price, percentage) => {
  return price - price * (percentage / 100)
}

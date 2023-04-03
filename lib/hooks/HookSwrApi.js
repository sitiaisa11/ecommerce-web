import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const HookSwrApi = ({ path, query }) => {
  const [params, setParams] = useState(query || '')

  const { data, error, mutate, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_DUMMY}${path}${params}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  const reloadData = (queryParams = '') => {
    setParams(queryParams)
    mutate()
  }

  return {
    data: data || null,
    isLoading: isValidating,
    isError: error,
    reloadData,
  }
}

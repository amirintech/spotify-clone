'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'

import useDebounce from '@/hooks/useDebounce'
import Input from '../../../components/shared/Input'

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value)

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }
    const url = queryString.stringifyUrl({
      url: '/search',
      query,
    })
    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      placeholder='Discover Chill Vibes on Spotify'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default SearchInput

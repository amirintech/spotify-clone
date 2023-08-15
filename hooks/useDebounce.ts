import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay || 500)
    console.log('hey')
    return () => clearTimeout(timerId)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
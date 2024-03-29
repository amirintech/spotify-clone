'use client'

import AuthModal from '@/components/modals/AuthModal'
import SubscribeModal from '@/components/modals/SubscribeModal'
import UploadModal from '@/components/modals/UploadModal'
import { ProductWithPrice } from '@/types'
import { FC, useEffect, useState } from 'react'

interface Props {
  products: ProductWithPrice[]
}

const ModalProvider: FC<Props> = ({ products }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  )
}

export default ModalProvider

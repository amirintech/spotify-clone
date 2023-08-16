'use client'

import AuthModal from '@/components/modals/AuthModal'
import UploadModal from '@/components/modals/UploadModal'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider

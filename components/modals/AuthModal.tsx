'use client'

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'
import { useEffect } from 'react'

const AuthModal = () => {
  const client = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()
  const handleChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  useEffect(() => {
    // To close the modal after logging in
    if (session) router.refresh()
    onClose()
  }, [session, router, onClose])

  return (
    <Modal
      title='Welcome back!'
      description='Login to your account'
      isOpen={isOpen}
      onChange={handleChange}
    >
      <Auth
        theme='dark'
        supabaseClient={client}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  )
}

export default AuthModal

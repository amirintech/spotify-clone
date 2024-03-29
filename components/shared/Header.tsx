'use client'

import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import usePlayer from '@/hooks/usePlayer'

interface Props {
  children: ReactNode
  className?: string
}

const Header: FC<Props> = ({ children, className }) => {
  const player = usePlayer()
  const router = useRouter()
  const { onOpen } = useAuthModal()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    player.reset()
    router.refresh()

    if (error) toast.error(error.message)
    else toast.success("You've logged out!")
  }

  return (
    <div
      className={twMerge(
        'h-fit bg-gradient-to-b from-emerald-800 p-6',
        className,
      )}
    >
      <div className='mb-4 flex w-full items-center justify-between'>
        {/* navigation buttons */}
        <div className='hidden items-center gap-x-2 md:flex'>
          <button
            aria-label='go back'
            onClick={() => router.back()}
            className='flex items-center justify-center rounded-full bg-black transition hover:opacity-75'
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            aria-label='go forward'
            onClick={() => router.forward()}
            className='flex items-center justify-center rounded-full bg-black transition hover:opacity-75'
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>

        {/* mobile navigation buttons */}
        <div className='flex items-center gap-x-2 md:hidden'>
          <button
            aria-label='home'
            className='flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75'
          >
            <HiHome className='text-black' size={20} />
          </button>
          <button
            aria-label='home'
            className='flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75'
          >
            <BiSearch className='text-black' size={20} />
          </button>
        </div>

        {/* auth buttons */}
        <div className='flex items-center justify-between gap-x-4'>
          {user ? (
            <div className='flex items-center gap-x-4'>
              <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className='bg-white'
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={onOpen}
                className='whitespace-nowrap bg-transparent font-medium text-neutral-300'
              >
                Sign up
              </Button>
              <Button onClick={onOpen} className='bg-white px-6 py-2'>
                Login
              </Button>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

export default Header

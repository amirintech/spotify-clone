'use client'

import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Button from './Button'

interface Props {
  children: ReactNode
  className?: string
}

const Header: FC<Props> = ({ children, className }) => {
  const router = useRouter()
  const handleLogout = () => {}

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
          <Button className='whitespace-nowrap bg-transparent font-medium text-neutral-300'>
            Sign up
          </Button>
          <Button className='bg-white px-6 py-2'>Login</Button>
        </div>
      </div>

      {children}
    </div>
  )
}

export default Header

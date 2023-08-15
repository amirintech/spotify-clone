'use client'

import { FC, ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import Library from './Library'
import { Song } from '@/types'

interface Props {
  children: ReactNode
  songs: Song[]
}

const Sidebar: FC<Props> = ({ children, songs }) => {
  const pathname = usePathname()
  const routes = useMemo(
    () => [
      { label: 'Home', active: pathname != '/search', href: '/', icon: HiHome },
      {
        label: 'Search',
        active: pathname == '/search',
        href: '/search',
        icon: BiSearch,
      },
    ],
    [pathname],
  )

  return (
    <div className='flex h-full'>
      <div className='hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex'>
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {routes.map((route) => (
              <SidebarItem key={route.label} item={route} />
            ))}
          </div>
        </Box>
        <Box className='h-full overflow-y-auto'>
          <Library songs={songs} />
        </Box>
      </div>

      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  )
}

export default Sidebar

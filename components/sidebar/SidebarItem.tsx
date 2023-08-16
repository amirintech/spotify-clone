import Link from 'next/link'
import { FC } from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

export interface Item {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

interface Props {
  item: Item
}

const SidebarItem: FC<Props> = ({
  item: { href, icon: Icon, label, active },
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white',
        active && 'text-white',
      )}
    >
      <Icon size={26} />
      <p className='w-full truncate'>{label}</p>
    </Link>
  )
}

export default SidebarItem

'use client'

import useLoadImage from '@/hooks/useLoadImage'
import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  song: Song
  onClick?: (songId: string) => void
}

const MediaItem: FC<Props> = ({ onClick, song }) => {
  const player = usePlayer()
  const imageUrl = useLoadImage(song) as string
  const handleClick = () => {
    onClick?.(song.id)
    player.setActiveId(song.id)
  }
  return (
    <div
      role='button'
      onClick={handleClick}
      className='flex w-full cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-neutral-800/50'
    >
      <div className='relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md'>
        <Image
          fill
          src={imageUrl}
          alt={song.title + ' by ' + song.author}
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='truncate text-white'>{song.title}</p>
        <p className='truncate text-sm text-neutral-400'>{song.author}</p>
      </div>
    </div>
  )
}

export default MediaItem

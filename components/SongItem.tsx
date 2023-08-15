'use client'

import PlayButton from '@/components/PlayButton'
import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  onClick: (song: Song) => void
  song: Song
}

const SongItem: FC<Props> = ({ song, onClick }) => {
  const imagePath = useLoadImage(song) as string

  return (
    <div
      role='button'
      onClick={() => onClick(song)}
      className='group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10'
    >
      <div className='relative aspect-square h-full w-full overflow-hidden rounded-md'>
        <Image
          alt={song.title + ' by ' + song.author}
          className='object-cover'
          src={imagePath}
          fill
        />
      </div>
      <div className='flex w-full flex-col items-start gap-y-1 pt-4'>
        <p className='w-full truncate font-semibold'>{song.title}</p>
        <p className='w-full truncate pb-4 text-sm font-semibold text-neutral-400'>
          {song.author}
        </p>
      </div>

      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem

'use client'

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import { Song } from '@/types'
import { FC } from 'react'

interface Props {
  songs: Song[]
}

const SearchResults: FC<Props> = ({ songs }) => {
  if (songs.length === 0)
    return (
      <div className='flex w-full flex-col gap-y-2 px-6 text-neutral-400'>
        Uh-oh! 🎵 That song seems to be dancing elsewhere. Give it another go or
        sway to our recommended tunes! 🎶✨
      </div>
    )

  return (
    <ul className='flex w-full flex-col gap-y-2 px-6'>
      {songs.map((song) => (
        <li key={song.id} className='flex w-full items-center gap-x-4'>
          <div className='flex-1'>
            <MediaItem song={song} />
          </div>
          <LikeButton songId={song.id} />
        </li>
      ))}
    </ul>
  )
}

export default SearchResults

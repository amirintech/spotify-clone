'use client'

import { Song } from '@/types'
import { FC } from 'react'
import SongItem from '../../../components/SongItem'

interface Props {
  songs: Song[]
}

const SongList: FC<Props> = ({ songs }) => {
  if (songs.length === 0)
    return (
      <div className='mt-4 text-neutral-400'>
        While our collection of tunes is currently taking a short intermission,
        fear not! Our team of musical maestros is working tirelessly behind the
        scenes to bring you a symphony of melodies from around the world.
      </div>
    )

  return (
    <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
      {songs.map((song) => (
        <SongItem key={song.id} song={song} onClick={console.log} />
      ))}
    </div>
  )
}

export default SongList

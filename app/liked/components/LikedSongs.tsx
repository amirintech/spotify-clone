'use client'

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

interface Props {
  songs: Song[]
}

const LikedSongs: FC<Props> = ({ songs }) => {
  const router = useRouter()
  const { isLoading, user } = useUser()

  useEffect(() => {
    // only authenticated users are allowed
    if (!isLoading && !user) router.replace('/')
  }, [isLoading, user, router])

  if (songs.length === 0)
    return (
      <p className='px-6 text-neutral-400'>
        Looks like this space is craving some musical love! Create a playlist
        that&apos; all YOU by adding tracks to your Liked Songs. Let the tunes
        begin by tapping that 💚!
      </p>
    )

  return (
    <div className='flex w-full flex-col gap-y-2 p-6'>
      {songs.map((song) => (
        <div key={song.id} className='flex w-full items-center gap-x-4'>
          <div className='flex-1'>
            <MediaItem onClick={console.log} song={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedSongs

'use client'

import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import { FC } from 'react'
import MediaItem from '../media/MediaItem'
import useOnPlay from '@/hooks/useOnPlay'

interface Props {
  songs: Song[]
}

const Library: FC<Props> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const onPlay = useOnPlay(songs)

  const handleClick = () => {
    if (!user) return authModal.onOpen()
    uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='font-medium text-neutral-400'>Your Library</p>
        </div>

        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className='cursor-pointer text-neutral-400 transition hover:text-white'
        />
      </div>

      <div className='mt-4 flex flex-col gap-y-2 px-3'>
        {songs.map((song) => (
          <MediaItem key={song.id} onClick={onPlay} song={song} />
        ))}
      </div>
    </div>
  )
}

export default Library

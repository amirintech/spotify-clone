'use client'

import { FC } from 'react'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'

interface Props {
  isPlaying: boolean
  onClick: () => void
}

const PlayerPlayButton: FC<Props> = ({ isPlaying, onClick }) => {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill

  return (
    <button
      aria-label={isPlaying ? 'play' : 'pause'}
      onClick={onClick}
      className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1'
    >
      <Icon size={30} className='text-black' />
    </button>
  )
}

export default PlayerPlayButton

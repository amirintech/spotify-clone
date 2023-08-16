'use client'

// @ts-ignore
import useSound from 'use-sound'
import { useEffect, useState } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'

import { Song } from '@/types'
import usePlayer from '@/hooks/usePlayer'
import LikeButton from '../shared/LikeButton'
import MediaItem from '../media/MediaItem'
import PlayerPlayButton from './PlayerPlayButton'
import VolumeSlider from './VolumeSlider'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlayNext = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]
    if (!nextSong) return player.setActiveId(player.ids[0])

    player.setActiveId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]
    if (!previousSong)
      return player.setActiveId(player.ids[player.ids.length - 1])

    player.setActiveId(previousSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  useEffect(() => {
    sound?.play()

    return () => sound?.unload()
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) play()
    else pause()
  }

  return (
    <div className='grid h-full grid-cols-2 md:grid-cols-3'>
      {/* songs details */}
      <div className='flex w-full justify-start'>
        <div className='flex items-center gap-x-4'>
          <MediaItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* player controls */}
      <div className='col-auto flex w-full items-center justify-end md:hidden'>
        <PlayerPlayButton isPlaying={isPlaying} onClick={handlePlay} />
      </div>

      <div className=' hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex'>
        <AiFillStepBackward
          role='button'
          aria-label='previous song'
          onClick={onPlayPrevious}
          size={30}
          className='cursor-pointer text-neutral-400 transition hover:text-white'
        />

        <PlayerPlayButton isPlaying={isPlaying} onClick={handlePlay} />

        <AiFillStepForward
          role='button'
          aria-label='next song'
          onClick={onPlayNext}
          size={30}
          className='cursor-pointer text-neutral-400 transition hover:text-white'
        />
      </div>

      {/* volume slider */}
      <VolumeSlider volume={volume} onVolumeChange={setVolume} />
    </div>
  )
}

export default PlayerContent

'use client'

import { FC } from 'react'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import Slider from '../shared/Slider'

interface Props {
  volume: number
  onVolumeChange: (value: number) => void
}

const VolumeSlider: FC<Props> = ({ volume, onVolumeChange }) => {
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave
  const toggleMute = () => onVolumeChange(volume > 0 ? 0 : 1)

  return (
    <div className='hidden w-full justify-end pr-2 md:flex'>
      <div className='flex w-[120px] items-center gap-x-2'>
        <VolumeIcon
          aria-label={volume > 0 ? 'unmute' : 'mute'}
          role='button'
          onClick={toggleMute}
          className='cursor-pointer'
          size={34}
        />
        <Slider
          ariaLabel='volume'
          value={volume}
          onChange={(value) => onVolumeChange(value)}
        />
      </div>
    </div>
  )
}

export default VolumeSlider

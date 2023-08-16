'use client'

import { BounceLoader } from 'react-spinners'
import Box from '@/components/shared/Box'

const Loading = () => {
  return (
    <Box className='flex h-full flex-col items-center justify-center gap-4 p-6'>
      <BounceLoader color='#22c55e' size={40} />
      <p className='text-neutral-400'>
        Grooving in progress... 🎶🕺🎵 Please wait while we set the stage for
        your tunes.
      </p>
    </Box>
  )
}

export default Loading

'use client'

import Box from '@/components/shared/Box'

const Error = () => {
  return (
    <Box className='flex h-full flex-col items-center justify-center gap-4 p-6 text-center'>
      <h1 className='text-3xl font-semibold text-neutral-200'>
        Oops! Something Went Wrong 🥺
      </h1>
      <p className='max-w-[60ch] text-neutral-400'>
        We&apos;re sorry, but it seems like there&apos;s a hiccup in the
        harmony. Our team is working hard to bring the music back to your ears.
        Please try again later, and if the issue persists, feel free to reach
        out to our support team for assistance. We appreciate your patience and
        passion for music. Stay tuned!
      </p>
    </Box>
  )
}

export default Error

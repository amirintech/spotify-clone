'use client'

import * as RadixSlider from '@radix-ui/react-slider'
import { FC } from 'react'

interface Props {
  ariaLabel: string
  value?: number
  onChange?: (value: number) => void
}

const Slider: FC<Props> = ({ value = 1, onChange, ariaLabel }) => {
  const handleValueChange = (values: number[]) => onChange?.(values[0])

  return (
    <RadixSlider.Root
      className='relative flex h-10 w-full touch-none select-none items-center'
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleValueChange}
      max={1}
      step={0.1}
      aria-label={ariaLabel}
    >
      <RadixSlider.Track className='relative h-[3px] grow rounded-full bg-neutral-600'>
        <RadixSlider.Range className='absolute h-full rounded-full bg-white' />
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}

export default Slider

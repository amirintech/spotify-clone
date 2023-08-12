import * as Dialog from '@radix-ui/react-dialog'
import { FC, ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'

interface Props {
  title: string
  isOpen: boolean
  onChange: (open: boolean) => void
  description: string
  children: ReactNode
}

const Modal: FC<Props> = ({
  children,
  description,
  isOpen,
  onChange,
  title,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        {/* overlay */}
        <Dialog.Overlay className='fixed inset-0 bg-neutral-900/90 backdrop-blur-sm' />

        {/* content */}
        <Dialog.Content className='fixed left-2/4 top-2/4 h-full max-h-full w-full -translate-x-2/4 -translate-y-2/4 rounded-md border border-neutral-700 bg-neutral-800 p-6 drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]'>
          {/* title */}
          <Dialog.Title className='mb-4 text-center text-xl font-bold'>
            {title}
          </Dialog.Title>

          {/* description */}
          <Dialog.Description className='mb-5 text-center text-sm leading-normal'>
            {description}
          </Dialog.Description>

          {/* modal content */}
          <div>{children}</div>

          {/* close button */}
          <Dialog.Close asChild>
            <button className='absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none'>
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal

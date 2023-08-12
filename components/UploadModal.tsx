'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import uniqid from 'uniqid'
import { z } from 'zod'

import { useRouter } from 'next/navigation'
import useUploadModal from '@/hooks/useUploadModal'
import Modal from './Modal'
import Input from './Input'
import Button from './Button'
import { useUser } from '@/hooks/useUser'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  author: z.string().min(2, 'Author is required'),
  song: z.any(),
  image: z.any(),
})

type FormData = z.infer<typeof schema>

const UploadModal = () => {
  const [loading, setLoading] = useState(false)
  const { isOpen, onClose } = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const handleChange = (isOpen: boolean) => {
    if (!isOpen) {
      reset()
      onClose()
    }
  }

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data)
    console.log('submitted')
    try {
      setLoading(true)

      if (!user) return toast.error('Sign in to upload a song')

      const imageFile = data.image?.[0] // data.image is a FileList
      const songFile = data.song?.[0]
      if (!imageFile || !songFile)
        return toast.error('Please fill all required fields')

      const id = uniqid()
      // upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${data.title}-${id}`, songFile)
      if (songError) return toast.error('Failed to upload the song')

      // upload song cover
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${data.title}-${id}`, imageFile)
      if (imageError) return toast.error('Failed to upload the song cover')

      // add the song to the db
      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: data.title as string,
          author: data.author as string,
          image_path: imageData.path,
          song_path: songData.path,
        })
      if (supabaseError) return toast.error(supabaseError.message)

      router.refresh()
      toast.success('Song Published Successfully!')
      reset()
      onClose() // close the upload modal
    } catch (e) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title='Upload a Song'
      description='Easily share and publish your songs to a worldwide audience'
      isOpen={isOpen}
      onChange={handleChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input
          id='title'
          placeholder='Song title'
          disabled={loading}
          {...register('title', { required: true })}
        />
        <Input
          id='author'
          placeholder='Song author'
          disabled={loading}
          {...register('author', { required: true })}
        />

        {/* song upload */}
        <div>
          <p className='pb-1'>Select a song file</p>
          <Input
            id='song'
            type='file'
            disabled={loading}
            accept='.mp3'
            className='cursor-pointer'
            {...register('song', { required: true })}
          />
        </div>

        {/* cover upload */}
        <div>
          <p className='pb-1'>Select an image</p>
          <Input
            id='image'
            type='file'
            disabled={loading}
            accept='image/*'
            className='cursor-pointer'
            {...register('image', { required: true })}
          />
        </div>

        <Button disabled={loading} type='submit'>
          Publish
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal

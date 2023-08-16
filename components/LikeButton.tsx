'use client'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface Props {
  songId: string
}

const LikeButton: FC<Props> = ({ songId }) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()
  const authModa = useAuthModal()
  const { user } = useUser()

  const [isLiked, setLiked] = useState(false)
  useEffect(() => {
    if (!user) return

    const checkIfSongIsLiked = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select()
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) setLiked(true)
    }

    checkIfSongIsLiked()
  }, [songId, user, supabaseClient])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart
  const handleLike = async () => {
    if (!user) return authModa.onOpen()

    if (isLiked) {
      setLiked(false)

      // unlike it
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message)
        setLiked(true)
      }
    } else {
      setLiked(true)

      // like it
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        setLiked(false)
      }
    }

    router.refresh()
  }

  return (
    <button onClick={handleLike} className='transition hover:opacity-75'>
      <span className='sr-only'>{isLiked ? 'like' : 'unlike'} song</span>
      <Icon
        size={25}
        className={`transition ${isLiked ? 'text-[#22c55e]' : 'text-white'}`}
      />
    </button>
  )
}

export default LikeButton

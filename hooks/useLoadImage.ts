import { Song } from '@/types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const useLoadImage = (song: Song) => {
  const supabase = useSupabaseClient()

  if (!song) return null

  const { data: image } = supabase.storage
    .from('images')
    .getPublicUrl(song.image_path)
  return image.publicUrl
}

export default useLoadImage

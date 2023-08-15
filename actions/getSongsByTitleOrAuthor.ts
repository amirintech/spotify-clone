import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Song } from '@/types'
import getSongs from './getSongs'

const getSongsByTitleOrAuthor = async (
  titleOrAuthor: string,
): Promise<Song[]> => {
  if (!titleOrAuthor) return await getSongs()

  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .or(`author.ilike.%${titleOrAuthor}%,title.ilike.%${titleOrAuthor}%`)
    .order('created_at', { ascending: false })

  if (error) console.error(error)
  return data ?? []
}

export default getSongsByTitleOrAuthor

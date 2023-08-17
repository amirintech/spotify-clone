import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })
  const { data } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  return data ?? []
}

export default getSongs

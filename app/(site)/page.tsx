import getSongs from '@/actions/getSongs'
import Header from '@/components/shared/Header'
import ListItem from '@/components/sidebar/ListItem'
import SongList from './components/SongList'
import getLikedSongs from '@/actions/getLikedSongs'

export const revalidate = 0

const Home = async () => {
  const songs = await getSongs()

  return (
    <div className='h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
      {/* header */}
      <Header>
        <div className='mb-2'>
          <h1 className='text-3xl font-semibold text-white'>Welcome back!</h1>
          <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            <ListItem
              image='/images/liked.png'
              href='/liked'
              name='Liked Songs'
            />
          </div>
        </div>
      </Header>

      {/* List of songs */}
      <div className='mb-7 mt-2 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-white'>Newest Songs</h1>
        </div>

        <SongList songs={songs} />
      </div>
    </div>
  )
}

export default Home

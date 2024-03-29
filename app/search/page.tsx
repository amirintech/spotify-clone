import getSongsByTitle from '@/actions/getSongsByTitleOrAuthor'
import Header from '@/components/shared/Header'
import SearchInput from '@/app/search/components/SearchInput'
import { FC } from 'react'
import SearchResults from './components/SearchResults'

interface Props {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

const page: FC<Props> = async ({ searchParams }) => {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <div className='h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
      <Header className='from-bg-neutral-900'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-3xl font-semibold text-white'>Search</h1>
          <SearchInput />
        </div>
      </Header>

      <SearchResults songs={songs} />
    </div>
  )
}

export default page

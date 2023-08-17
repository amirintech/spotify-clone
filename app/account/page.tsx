import Header from '@/components/shared/Header'
import AccountContent from './components/AccountContent'

const Account = () => {
  return (
    <div className='h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900'>
      <Header className='from-neutral-900'>
        <h1 className='text-3xl font-semibold text-white'>Account Settings</h1>
      </Header>
      <AccountContent />
    </div>
  )
}

export default Account

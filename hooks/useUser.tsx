import { Subscription, UserDetails } from '@/types'
import { User } from '@supabase/auth-helpers-nextjs'
import {
  useSessionContext,
  useUser as userSupabaseUser,
} from '@supabase/auth-helpers-react'
import { createContext, useContext, useEffect, useState } from 'react'

interface UserContextType {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: Boolean
  subscription: Subscription | null
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export interface Props {
  [key: string]: any
}

export const UserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const user = userSupabaseUser()
  const accessToken = session?.access_token ?? null
  const [isLoadingData, setLoadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getUserDetails = () => supabase.from('users').select('*').single()
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()

  useEffect(() => {
    if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }

    if (user && !isLoadingData && !userDetails && !subscription)
      setLoadingData(true)
    Promise.allSettled([getUserDetails(), getSubscription()]).then((res) => {
      const userDetailsPromise = res[0]
      const subscriptionPromise = res[1]

      if (userDetailsPromise.status == 'fulfilled') {
        setUserDetails(userDetailsPromise.value.data)
        console.log('================user=============')
        console.log(userDetailsPromise.value.data)
      }

      if (subscriptionPromise.status == 'fulfilled') {
        setSubscription(subscriptionPromise.value.data)

        console.log('================subsritopn=============')
        console.log(subscriptionPromise.value.data)
      }
      setLoadingData(false)
    })
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('userUser myst be used within UserContext')

  return context
}

'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { FC, ReactNode, useState } from 'react'
import { Database } from '@/types_db'

interface Props {
  children: ReactNode
}

const SupabaseProvider: FC<Props> = ({ children }) => {
  const [client] = useState(() => createClientComponentClient<Database>())

  return (
    <SessionContextProvider supabaseClient={client}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider

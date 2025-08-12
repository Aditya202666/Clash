
import { auth } from '@/auth'
import AddClash from '@/components/clash/AddClash'
import Navbar from '@/components/common/Navbar'
import React from 'react'

export default async function Dashboard() {

  const session  = await auth()

  return (
    <div className='px-4 md:px-6 lg:px-8 '>
      <Navbar />
      <AddClash user={session?.user!} />
    </div>
  )
}
    
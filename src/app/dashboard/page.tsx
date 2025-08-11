
import { auth } from '@/auth'
import Navbar from '@/components/common/Navbar'
import React from 'react'

export default function Dashboard() {

  const session  = auth()

  return (
    <div>
      <Navbar />
    </div>
  )
}
    
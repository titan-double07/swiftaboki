import React, { ReactNode } from 'react'
import Nav from './Nav'

interface IDashBoardLayout {
    children: ReactNode
}
export default function DashboardLayout({children}:IDashBoardLayout) {
  return (
    <div>
        <Nav/>
        {children}
    </div>
  )
}

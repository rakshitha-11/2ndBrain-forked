import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from './AppSidebar'
import { div } from 'framer-motion/client'
import Message from './Message/Message'

interface BrainProps {
  children: React.ReactNode;
}


const Brain: React.FC<BrainProps> = ({ children })=> {
  return (
    <div className='pt-9 w-full'>
      <SidebarProvider>
      <div className='pt-20 bg-black'>
        <AppSidebar />
      </div>
      <main className='w-full'>
        <SidebarTrigger />
        <div className=''>
          {children}
        </div>
      </main>
    </SidebarProvider>
    </div>
  )
}

export default Brain

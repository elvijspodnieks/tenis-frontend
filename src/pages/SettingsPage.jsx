import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/common/Header'

const SettingsPage = () => {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10 '>
        <Header title="Settings" />
       

      </div>
     
    </div>
  )
}

export default SettingsPage
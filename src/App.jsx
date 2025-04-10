import React from 'react'
import { useState } from 'react'
import TabloPage from './pages/TabloPage'
import AdminPage from './pages/AdminPage'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PlayersPage from './pages/PlayersPage'
import TournamentsPage from './pages/TournamentsPage'
import GamesPage from './pages/GamesPage'
import SettingsPage from './pages/SettingsPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Routes>
        <Route path='/' element={<AdminPage />}/>
        <Route path='/tablo' element={<TabloPage />}/>
        <Route path='/players' element={<PlayersPage />}/>
        <Route path='/tournaments' element={<TournamentsPage />}/>
        <Route path='/games' element={<GamesPage />}/>
        <Route path='/settings' element={<SettingsPage />}/>
      </Routes>
    </div>
  )
}

export default App

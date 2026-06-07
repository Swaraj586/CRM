import { useState } from 'react'
import Dashboard from './components/dashboard'
import './App.css'
import Create from './components/Create'
import Stats from './components/Stats'
import Title from './components/Title'

function App() {
  

  return (
    <>
      <Title />
      <Stats />
      <Dashboard />
    </>
  )
}

export default App

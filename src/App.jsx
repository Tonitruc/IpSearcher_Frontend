import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VpnListComponent from './components/VpnListComponent'
import HeaderComponent from './components/HeaderComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VpnComponent from './components/VpnComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeaderComponent />
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<VpnListComponent />}></Route>
          <Route path='/vpns' element = {<VpnListComponent />}></Route>
          <Route path='/add-vpn' element = {<VpnComponent />}></Route>
          <Route path='/edit-vpn/:vpnId' element = {<VpnComponent />}></Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

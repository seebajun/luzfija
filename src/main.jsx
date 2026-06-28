import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import GearPage from './pages/GearPage.jsx'
import GearMember from './pages/GearMember.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/luzfija">
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="gear" element={<GearPage />} />
          <Route path="gear/:member" element={<GearMember />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import GearPage from './pages/Gear/GearPage.jsx'
import GearMember from './pages/Gear/GearMember.jsx'
import InfoPage from './pages/Info/InfoPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/luzfija">
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="gear" element={<GearPage />} />
          <Route path="gear/:member" element={<GearMember />} />
          <Route path="info" element={<InfoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

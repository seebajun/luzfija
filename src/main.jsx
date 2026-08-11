/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const HomePage = lazy(() => import('./pages/Home/HomePage.jsx'))
const GearPage = lazy(() => import('./pages/Gear/GearPage.jsx'))
const GearMember = lazy(() => import('./pages/Gear/GearMember.jsx'))
const ContactoPage = lazy(() => import('./pages/Contacto/ContactoPage.jsx'))

function PageFallback() {
  return <div className="y2k-container" />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="gear"
            element={
              <Suspense fallback={<PageFallback />}>
                <GearPage />
              </Suspense>
            }
          />
          <Route
            path="gear/:member"
            element={
              <Suspense fallback={<PageFallback />}>
                <GearMember />
              </Suspense>
            }
          />
          <Route
            path="contacto"
            element={
              <Suspense fallback={<PageFallback />}>
                <ContactoPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'

const mantineTheme = createTheme({
  fontFamily:
    '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
})
import { AuthProvider } from './contexts/AuthContext'
import { SiteContentProvider } from './contexts/SiteContentContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PortfolioApp } from './PortfolioApp'
import { LoginPage } from './pages/LoginPage'
import { AdminPage } from './pages/AdminPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioApp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={mantineTheme}>
        <AuthProvider>
          <SiteContentProvider>
            <AppRoutes />
          </SiteContentProvider>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  )
}

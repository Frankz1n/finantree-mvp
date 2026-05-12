import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout/DashboardLayout'
import { PwaInstallPrompt } from './components/pwa/PwaInstallPrompt'
import { Home } from './pages/Home/Home'
import { Statements } from './pages/Statements/Statements'
import { Profile } from './pages/Profile/Profile'
import { Recurring } from './pages/Recurring/Recurring'
import { Garden } from './pages/Garden/Garden'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import { useAuth } from '@/hooks/useAuth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  return <DashboardLayout>{children}</DashboardLayout>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />

  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <PwaInstallPrompt />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/extract" element={<ProtectedRoute><Statements /></ProtectedRoute>} />
        <Route path="/recurring" element={<ProtectedRoute><Recurring /></ProtectedRoute>} />
        <Route path="/garden" element={<ProtectedRoute><Garden /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Header } from './components/layout/Header'
import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { StudentDashboard } from './pages/StudentDashboard'
import { OrganizationDashboard } from './pages/OrganizationDashboard'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProjectDetail } from './pages/ProjectDetail'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { MentorProfile } from './pages/MentorProfile'
import { SettingsPage } from './pages/SettingsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />
}

function AppRoutes() {
  const { user, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to={userRole === 'student' ? '/dashboard' : '/org-dashboard'} /> : <AuthPage />} />
        <Route path="/signup" element={user ? <Navigate to={userRole === 'student' ? '/dashboard' : '/org-dashboard'} /> : <AuthPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {userRole === 'student' ? <StudentDashboard /> : <Navigate to="/org-dashboard" />}
          </ProtectedRoute>
        } />
        <Route path="/org-dashboard" element={
          <ProtectedRoute>
            {userRole === 'organization' ? <OrganizationDashboard /> : <Navigate to="/dashboard" />}
          </ProtectedRoute>
        } />
        
        {/* Public/Semi-protected Routes */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/mentors/:id" element={<MentorProfile />} />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
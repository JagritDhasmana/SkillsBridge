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
import { MentorsPage } from './pages/MentorsPage'
import { MentorProfile } from './pages/MentorProfile'
import { ApplicationsPage } from './pages/ApplicationsPage'
import { MessagesPage } from './pages/MessagesPage'
import { SettingsPage } from './pages/SettingsPage'
import { supabase } from './lib/supabase'

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
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/mentors/:id" element={<MentorProfile />} />
        <Route path="/applications" element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/org-projects" element={<div>Organization Projects Page</div>} />
        <Route path="/applicants" element={<div>Applicants Page</div>} />
        
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
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700">
            Supabase URL and anonymous key are not configured. Please create a '.env.local' file in the root of the project and add the following variables:
          </p>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-left text-sm">
            <code>
              VITE_SUPABASE_URL=your_supabase_url_here
              <br />
              VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
            </code>
          </pre>
          <p className="text-gray-700 mt-4">
            You can get these from your Supabase project settings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'

export function Header() {
  const { user, userRole, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Get username from user data
  const getUserName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  return (
    <header className="bg-white border-b border-gray-200 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to={user ? (userRole === 'student' ? '/dashboard' : '/org-dashboard') : '/'} 
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">SkillBridge</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              Projects
            </Link>
            <Link to="/mentors" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              Mentors
            </Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 animate-slide-in-right">
                <Link to={userRole === 'student' ? '/dashboard' : '/org-dashboard'}>
                  <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="hover:scale-105 transition-transform duration-200">
                  <LogOut className="w-4 h-4 mr-2" />
                  {getUserName()} / Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 animate-slide-in-right">
                <Link to="/login">
                  <Button variant="ghost" className="hover:scale-105 transition-transform duration-200">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="hover:scale-105 transition-transform duration-200">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
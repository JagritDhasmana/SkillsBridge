import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  User, 
  Home,
  Trophy,
  Settings,
  Users
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAuth } from '../../contexts/AuthContext'

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
}

export function Sidebar() {
  const location = useLocation()
  const { userRole } = useAuth()

  const studentItems: SidebarItem[] = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/dashboard' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Projects', href: '/projects' },
    { icon: <FileText className="w-5 h-5" />, label: 'Applications', href: '/applications' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', href: '/messages' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', href: '/leaderboard' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/profile' },
  ]

  const orgItems: SidebarItem[] = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/org-dashboard' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'My Projects', href: '/org-projects' },
    { icon: <Users className="w-5 h-5" />, label: 'Applicants', href: '/applicants' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', href: '/messages' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', href: '/profile' },
  ]

  const items = userRole === 'student' ? studentItems : orgItems

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === item.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Clock, MapPin, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Sidebar } from '../components/layout/Sidebar'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function StudentDashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Sample projects data with diverse organizations
  const sampleProjects = [
    {
      id: 1,
      title: "Mobile App Development for Educational Platform",
      organization: "TechForGood Inc.",
      duration: "3 months",
      type: "Remote",
      description: "Develop a React Native mobile application to help underprivileged students access educational resources offline.",
      skills: ["React Native", "JavaScript", "Firebase", "UI/UX Design"],
      applicants: 24
    },
    {
      id: 2,
      title: "Data Analysis for Environmental Impact Study",
      organization: "Green Earth NGO",
      duration: "2 months",
      type: "Hybrid",
      description: "Analyze environmental data to create insights for sustainable farming practices in rural communities.",
      skills: ["Python", "Data Science", "Pandas", "Matplotlib", "Environmental Science"],
      applicants: 18
    },
    {
      id: 3,
      title: "Website Redesign for Mental Health Awareness",
      organization: "MindCare Foundation",
      duration: "6 weeks",
      type: "Remote",
      description: "Redesign website to improve accessibility and user experience for mental health resources and support.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility", "UX Design"],
      applicants: 31
    },
    {
      id: 4,
      title: "AI Chatbot for Customer Support",
      organization: "InnovateX Startup",
      duration: "4 months",
      type: "On-site",
      description: "Build an intelligent chatbot using NLP to handle customer inquiries and improve response times.",
      skills: ["Python", "NLP", "Machine Learning", "TensorFlow", "API Development"],
      applicants: 42
    },
    {
      id: 5,
      title: "Blockchain Solution for Supply Chain Transparency",
      organization: "FairTrade Cooperative",
      duration: "5 months",
      type: "Remote",
      description: "Develop blockchain-based tracking system to ensure transparency in fair trade supply chains.",
      skills: ["Solidity", "Ethereum", "Web3.js", "JavaScript", "Smart Contracts"],
      applicants: 15
    },
    {
      id: 6,
      title: "E-Learning Platform for Rural Education",
      organization: "Educate India NGO",
      duration: "8 weeks",
      type: "Hybrid",
      description: "Create an offline-first e-learning platform to deliver quality education to remote rural areas.",
      skills: ["Vue.js", "Node.js", "Progressive Web Apps", "MongoDB", "Educational Technology"],
      applicants: 28
    }
  ]

  // Sample applications data
  const sampleApplications = [
    {
      id: 1,
      project: "Clean Water Monitoring System",
      organization: "Water.org",
      status: "Under Review",
      appliedDate: "2 days ago"
    },
    {
      id: 2,
      project: "Food Distribution App",
      organization: "Feeding America",
      status: "Accepted",
      appliedDate: "1 week ago"
    },
    {
      id: 3,
      project: "Digital Health Records System",
      organization: "MedTech Solutions",
      status: "Under Review",
      appliedDate: "3 days ago"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Try to fetch from database first
        if (supabase) {
          const { data: projectsData, error: projectsError } = await supabase
            .from('projects')
            .select('*')
            .limit(3)
          
          if (!projectsError && projectsData && projectsData.length > 0) {
            setProjects(projectsData)
          } else {
            // Fallback to sample data if database is empty or has issues
            setProjects(sampleProjects.slice(0, 3))
          }

          const { data: applicationsData, error: applicationsError } = await supabase
            .from('applications')
            .select('*, projects(*)')
            .limit(3)
          
          if (!applicationsError && applicationsData && applicationsData.length > 0) {
            setApplications(applicationsData)
          } else {
            // Fallback to sample data if database is empty or has issues
            setApplications(sampleApplications)
          }
        } else {
          // If no supabase connection, use sample data
          setProjects(sampleProjects.slice(0, 3))
          setApplications(sampleApplications)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback to sample data on error
        setProjects(sampleProjects.slice(0, 3))
        setApplications(sampleApplications)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
    return 'Student'
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {getUserName()}!</h1>
            <p className="text-gray-600">Discover new projects and continue building your skills.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Projects */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Recommended Projects</h2>
                  <Link to="/projects">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {project.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <Briefcase className="w-4 h-4 mr-1" />
                                  {project.organization}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {project.duration}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {project.type}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {(project.skills || []).map((skill: string, index: number) => (
                                  <span
                                    key={`${skill}-${index}`}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="ml-4 flex flex-col items-end">
                              <Link to={`/projects/${project.id}`}>
                                <Button size="sm">Apply</Button>
                              </Link>
                              <span className="text-sm text-gray-500 mt-2 flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {project.applicants || project.applications || 0} applicants
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Application Status */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    ) : applications.length > 0 ? (
                      applications.map((app) => (
                        <div key={app.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {app.project || app.projects?.title || 'Project Application'}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {app.organization || app.projects?.organization || 'Organization'}
                          </p>
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                app.status === 'Accepted'
                                  ? 'bg-green-100 text-green-700'
                                  : app.status === 'Under Review'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {app.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {app.appliedDate || app.applied_date || 'Recently'}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p>No applications yet</p>
                        <p className="text-sm mt-1">Start applying to projects to see them here!</p>
                      </div>
                    )}
                  </div>
                  <Link to="/applications">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Applications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projects Completed</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Rank</span>
                      <span className="font-semibold">#47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Points Earned</span>
                      <span className="font-semibold">245</span>
                    </div>
                  </div>
                  <Link to="/leaderboard">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Leaderboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
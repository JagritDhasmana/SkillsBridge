import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, MapPin, Briefcase, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Sidebar } from '../components/layout/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface Application {
  id: number
  project: string
  organization: string
  status: 'Under Review' | 'Accepted' | 'Rejected' | 'Interview Scheduled'
  appliedDate: string
  skills: string[]
  type: string
  duration: string
  description: string
  mentor?: string
}

export function ApplicationsPage() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  // Sample applications data
  const sampleApplications: Application[] = [
    {
      id: 1,
      project: "Mobile App Development for Educational Platform",
      organization: "TechForGood Inc.",
      status: "Under Review",
      appliedDate: "2024-01-15",
      skills: ["React Native", "JavaScript", "Firebase", "UI/UX Design"],
      type: "Remote",
      duration: "3 months",
      description: "Develop a React Native mobile application to help underprivileged students access educational resources offline.",
      mentor: "Sarah Johnson"
    },
    {
      id: 2,
      project: "Data Analysis for Environmental Impact Study",
      organization: "Green Earth NGO",
      status: "Accepted",
      appliedDate: "2024-01-10",
      skills: ["Python", "Data Science", "Pandas", "Matplotlib"],
      type: "Hybrid",
      duration: "2 months",
      description: "Analyze environmental data to create insights for sustainable farming practices in rural communities.",
      mentor: "Dr. Maria Garcia"
    },
    {
      id: 3,
      project: "Website Redesign for Mental Health Awareness",
      organization: "MindCare Foundation",
      status: "Interview Scheduled",
      appliedDate: "2024-01-12",
      skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility"],
      type: "Remote",
      duration: "6 weeks",
      description: "Redesign website to improve accessibility and user experience for mental health resources and support.",
      mentor: "Jennifer Lee"
    },
    {
      id: 4,
      project: "AI Chatbot for Customer Support",
      organization: "InnovateX Startup",
      status: "Rejected",
      appliedDate: "2024-01-08",
      skills: ["Python", "NLP", "Machine Learning", "TensorFlow"],
      type: "On-site",
      duration: "4 months",
      description: "Build an intelligent chatbot using NLP to handle customer inquiries and improve response times.",
      mentor: "Michael Chang"
    },
    {
      id: 5,
      project: "E-Learning Platform for Rural Education",
      organization: "Educate India NGO",
      status: "Under Review",
      appliedDate: "2024-01-14",
      skills: ["Vue.js", "Node.js", "Progressive Web Apps", "MongoDB"],
      type: "Hybrid",
      duration: "8 weeks",
      description: "Create an offline-first e-learning platform to deliver quality education to remote rural areas.",
      mentor: "Priya Sharma"
    },
    {
      id: 6,
      project: "Blockchain Solution for Supply Chain",
      organization: "FairTrade Cooperative",
      status: "Under Review",
      appliedDate: "2024-01-13",
      skills: ["Solidity", "Ethereum", "Web3.js", "JavaScript"],
      type: "Remote",
      duration: "5 months",
      description: "Develop blockchain-based tracking system to ensure transparency in fair trade supply chains.",
      mentor: "Robert Kim"
    }
  ]

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true)
      try {
        if (supabase && user) {
          const { data: applicationsData, error } = await supabase
            .from('applications')
            .select('*, projects(*)')
            .eq('student_id', user.id)
          
          if (!error && applicationsData && applicationsData.length > 0) {
            // Transform database data to match our interface
            const transformedData = applicationsData.map(app => ({
              id: app.id,
              project: app.projects?.title || 'Unknown Project',
              organization: app.projects?.organization || 'Unknown Organization',
              status: app.status || 'Under Review',
              appliedDate: new Date(app.applied_date).toISOString().split('T')[0],
              skills: app.projects?.skills || [],
              type: app.projects?.type || 'Remote',
              duration: app.projects?.duration || '4 weeks',
              description: app.projects?.description || 'No description available',
              mentor: app.projects?.mentor
            }))
            setApplications(transformedData)
          } else {
            // Fallback to sample data
            setApplications(sampleApplications)
          }
        } else {
          setApplications(sampleApplications)
        }
      } catch (error) {
        console.error('Error fetching applications:', error)
        setApplications(sampleApplications)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [user])

  useEffect(() => {
    let filtered = applications

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
  }, [applications, searchTerm, statusFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'Interview Scheduled':
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Applications</h1>
            <p className="text-gray-600">Track the status of your project applications and manage your opportunities.</p>
          </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Under Review">Under Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters.'
                : 'Start applying to projects to see them here!'
              }
            </p>
            <Link to="/projects">
              <Button>Browse Projects</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {application.project}
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {application.organization}
                            {application.mentor && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Mentor: {application.mentor}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-2">{application.status}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {application.description}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {application.duration}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {application.type}
                        </span>
                        <span>Applied on {formatDate(application.appliedDate)}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {application.skills.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Application ID: #{application.id}
                        </div>
                        <div className="flex space-x-3">
                          <Link to={`/projects/${application.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Project
                            </Button>
                          </Link>
                          {application.status === 'Interview Scheduled' && (
                            <Button size="sm">
                              Join Interview
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {!loading && applications.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {applications.length}
                </div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'Accepted').length}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'Under Review').length}
                </div>
                <div className="text-sm text-gray-600">Under Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {applications.filter(app => app.status === 'Interview Scheduled').length}
                </div>
                <div className="text-sm text-gray-600">Interviews</div>
              </CardContent>
            </Card>
          </div>
        )}
        </div>
      </main>
    </div>
  )
}

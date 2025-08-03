import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Clock, MapPin, Users, Briefcase, Check, X, Heart, HeartOff } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'

const projects = [
  {
    id: 1,
    title: 'Develop a Marketing Strategy for a New Product Launch',
    organization: 'TechStart Inc.',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Sarah Johnson',
    mentorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '4 weeks',
    skills: ['Marketing Strategy', 'Market Research', 'Content Creation'],
    description: 'Help our startup develop a comprehensive marketing strategy for our new product launch. You\'ll work directly with our marketing team to analyze market trends, identify target audiences, and create compelling content.',
    applicants: 12,
    type: 'Remote',
    postedDate: '2 days ago',
  },
  {
    id: 2,
    title: 'Analyze Customer Feedback for Product Improvement',
    organization: 'GreenTech Solutions',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'David Chen',
    mentorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '3 weeks',
    skills: ['Data Analysis', 'Customer Research', 'Excel'],
    description: 'Analyze customer feedback data to provide insights for product improvement. Work with our product team to identify patterns and recommend actionable improvements.',
    applicants: 8,
    type: 'Hybrid',
    postedDate: '5 days ago',
  },
  {
    id: 3,
    title: 'Create a Social Media Campaign for Eco Products',
    organization: 'EcoFriendly Co.',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Emily Rodriguez',
    mentorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '2 weeks',
    skills: ['Social Media', 'Content Creation', 'Digital Marketing'],
    description: 'Design and implement a social media campaign for our eco-friendly product launch. Create engaging content across multiple platforms to promote sustainability.',
    applicants: 15,
    type: 'Remote',
    postedDate: '1 week ago',
  },
  {
    id: 4,
    title: 'Mobile App Development for Educational Platform',
    organization: 'TechForGood Inc.',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Alex Thompson',
    mentorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '3 months',
    skills: ['React Native', 'JavaScript', 'Firebase', 'UI/UX Design'],
    description: 'Develop a React Native mobile application to help underprivileged students access educational resources offline. Work with our development team to create an impactful learning platform.',
    applicants: 24,
    type: 'Remote',
    postedDate: '3 days ago',
  },
  {
    id: 5,
    title: 'Data Analysis for Environmental Impact Study',
    organization: 'Green Earth NGO',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Dr. Maria Garcia',
    mentorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '2 months',
    skills: ['Python', 'Data Science', 'Pandas', 'Matplotlib', 'Environmental Science'],
    description: 'Analyze environmental data to create insights for sustainable farming practices in rural communities. Help us make a positive impact on climate change through data-driven solutions.',
    applicants: 18,
    type: 'Hybrid',
    postedDate: '1 week ago',
  },
  {
    id: 6,
    title: 'Website Redesign for Mental Health Awareness',
    organization: 'MindCare Foundation',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Jennifer Lee',
    mentorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '6 weeks',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'UX Design'],
    description: 'Redesign website to improve accessibility and user experience for mental health resources and support. Help us reach more people in need of mental health assistance.',
    applicants: 31,
    type: 'Remote',
    postedDate: '4 days ago',
  },
  {
    id: 7,
    title: 'AI Chatbot for Customer Support',
    organization: 'InnovateX Startup',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Michael Chang',
    mentorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '4 months',
    skills: ['Python', 'NLP', 'Machine Learning', 'TensorFlow', 'API Development'],
    description: 'Build an intelligent chatbot using NLP to handle customer inquiries and improve response times. Work with cutting-edge AI technology in a fast-paced startup environment.',
    applicants: 42,
    type: 'On-site',
    postedDate: '2 days ago',
  },
  {
    id: 8,
    title: 'E-Learning Platform for Rural Education',
    organization: 'Educate India NGO',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Priya Sharma',
    mentorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '8 weeks',
    skills: ['Vue.js', 'Node.js', 'Progressive Web Apps', 'MongoDB', 'Educational Technology'],
    description: 'Create an offline-first e-learning platform to deliver quality education to remote rural areas. Make a direct impact on educational accessibility in underserved communities.',
    applicants: 28,
    type: 'Hybrid',
    postedDate: '6 days ago',
  },
  {
    id: 9,
    title: 'Blockchain Solution for Supply Chain Transparency',
    organization: 'FairTrade Cooperative',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Robert Kim',
    mentorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '5 months',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'JavaScript', 'Smart Contracts'],
    description: 'Develop blockchain-based tracking system to ensure transparency in fair trade supply chains. Help promote ethical trading practices through innovative technology.',
    applicants: 15,
    type: 'Remote',
    postedDate: '3 days ago',
  },
  {
    id: 10,
    title: 'Digital Health Records System',
    organization: 'HealthTech Solutions',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Dr. Lisa Wang',
    mentorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '3 months',
    skills: ['React', 'Node.js', 'PostgreSQL', 'HIPAA Compliance', 'Healthcare IT'],
    description: 'Build a secure digital health records system to improve patient care and data management. Work with healthcare professionals to create HIPAA-compliant solutions.',
    applicants: 22,
    type: 'Hybrid',
    postedDate: '1 week ago',
  }
]

const filters = {
  skills: [
    'Marketing Strategy', 'Data Analysis', 'React', 'Python', 'JavaScript', 'Design', 
    'Development', 'Content Creation', 'Social Media', 'Machine Learning', 'Blockchain',
    'UI/UX Design', 'Node.js', 'Healthcare IT', 'Environmental Science', 'Educational Technology'
  ],
  duration: ['1-2 weeks', '3-4 weeks', '1-2 months', '3-4 months', '5+ months'],
  type: ['Remote', 'On-site', 'Hybrid'],
}

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    skills: [],
    duration: [],
    type: [],
  })
  const [showFilters, setShowFilters] = useState(false)
  const [appliedProjects, setAppliedProjects] = useState<Set<number>>(new Set())
  const [savedProjects, setSavedProjects] = useState<Set<number>>(new Set())
  const [applicationStatus, setApplicationStatus] = useState<{
    projectId: number | null
    status: 'applying' | 'success' | 'error' | null
    message: string
  }>({
    projectId: null,
    status: null,
    message: ''
  })
  const [saveStatus, setSaveStatus] = useState<{
    projectId: number | null
    status: 'saving' | 'success' | 'error' | null
    message: string
  }>({
    projectId: null,
    status: null,
    message: ''
  })

  // Simulate application process
  const handleApplyToProject = async (projectId: number, projectTitle: string) => {
    setApplicationStatus({
      projectId,
      status: 'applying',
      message: 'Submitting your application...'
    })

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add to applied projects
      setAppliedProjects(prev => new Set([...prev, projectId]))
      
      setApplicationStatus({
        projectId,
        status: 'success',
        message: `Successfully applied to "${projectTitle}"! We'll notify you about the next steps.`
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setApplicationStatus({
          projectId: null,
          status: null,
          message: ''
        })
      }, 5000)

    } catch (error) {
      setApplicationStatus({
        projectId,
        status: 'error',
        message: 'Failed to submit application. Please try again.'
      })

      // Clear error message after 3 seconds
      setTimeout(() => {
        setApplicationStatus({
          projectId: null,
          status: null,
          message: ''
        })
      }, 3000)
    }
  }

  // Handle saving/bookmarking projects
  const handleSaveProject = async (projectId: number, projectTitle: string) => {
    const isCurrentlySaved = savedProjects.has(projectId)
    
    setSaveStatus({
      projectId,
      status: 'saving',
      message: isCurrentlySaved ? 'Removing from saved projects...' : 'Saving project...'
    })

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (isCurrentlySaved) {
        // Remove from saved projects
        setSavedProjects(prev => {
          const newSet = new Set(prev)
          newSet.delete(projectId)
          return newSet
        })
        
        setSaveStatus({
          projectId,
          status: 'success',
          message: `"${projectTitle}" removed from saved projects.`
        })
      } else {
        // Add to saved projects
        setSavedProjects(prev => new Set([...prev, projectId]))
        
        setSaveStatus({
          projectId,
          status: 'success',
          message: `"${projectTitle}" saved successfully! Find it in your saved projects.`
        })
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveStatus({
          projectId: null,
          status: null,
          message: ''
        })
      }, 3000)

    } catch (error) {
      setSaveStatus({
        projectId,
        status: 'error',
        message: 'Failed to save project. Please try again.'
      })

      // Clear error message after 3 seconds
      setTimeout(() => {
        setSaveStatus({
          projectId: null,
          status: null,
          message: ''
        })
      }, 3000)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSkills = selectedFilters.skills.length === 0 ||
                         selectedFilters.skills.some(filterSkill => 
                           project.skills.some(projectSkill => 
                             projectSkill.toLowerCase().includes(filterSkill.toLowerCase()) ||
                             filterSkill.toLowerCase().includes(projectSkill.toLowerCase())
                           )
                         )
    
    const matchesDuration = selectedFilters.duration.length === 0 ||
                           selectedFilters.duration.some(filterDuration => {
                             if (filterDuration === '1-2 weeks') return project.duration.includes('week') && !project.duration.includes('3') && !project.duration.includes('4')
                             if (filterDuration === '3-4 weeks') return project.duration.includes('week') && (project.duration.includes('3') || project.duration.includes('4'))
                             if (filterDuration === '1-2 months') return project.duration.includes('month') && !project.duration.includes('3') && !project.duration.includes('4') && !project.duration.includes('5')
                             if (filterDuration === '3-4 months') return project.duration.includes('month') && (project.duration.includes('3') || project.duration.includes('4'))
                             if (filterDuration === '5+ months') return project.duration.includes('month') && project.duration.includes('5')
                             return false
                           })
    
    const matchesType = selectedFilters.type.length === 0 ||
                       selectedFilters.type.includes(project.type)

    return matchesSearch && matchesSkills && matchesDuration && matchesType
  })

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success/Error Notifications */}
      {(applicationStatus.status || saveStatus.status) && (
        <div className="fixed top-4 right-4 z-50 max-w-md space-y-2">
          {/* Application Status Notification */}
          {applicationStatus.status && (
            <div className={`rounded-lg p-4 shadow-lg border ${
              applicationStatus.status === 'success' ? 'bg-green-50 border-green-200' :
              applicationStatus.status === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {applicationStatus.status === 'success' && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                  {applicationStatus.status === 'error' && (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  {applicationStatus.status === 'applying' && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    applicationStatus.status === 'success' ? 'text-green-800' :
                    applicationStatus.status === 'error' ? 'text-red-800' :
                    'text-blue-800'
                  }`}>
                    {applicationStatus.message}
                  </p>
                </div>
                {applicationStatus.status !== 'applying' && (
                  <button
                    onClick={() => setApplicationStatus({ projectId: null, status: null, message: '' })}
                    className="ml-3 flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Save Status Notification */}
          {saveStatus.status && (
            <div className={`rounded-lg p-4 shadow-lg border ${
              saveStatus.status === 'success' ? 'bg-purple-50 border-purple-200' :
              saveStatus.status === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {saveStatus.status === 'success' && (
                    <Heart className="w-5 h-5 text-purple-600 fill-current" />
                  )}
                  {saveStatus.status === 'error' && (
                    <X className="w-5 h-5 text-red-600" />
                  )}
                  {saveStatus.status === 'saving' && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    saveStatus.status === 'success' ? 'text-purple-800' :
                    saveStatus.status === 'error' ? 'text-red-800' :
                    'text-blue-800'
                  }`}>
                    {saveStatus.message}
                  </p>
                </div>
                {saveStatus.status !== 'saving' && (
                  <button
                    onClick={() => setSaveStatus({ projectId: null, status: null, message: '' })}
                    className="ml-3 flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Projects</h1>
          <p className="text-gray-600">Find the perfect micro-internship opportunity to build your skills.</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(filters).map(([category, options]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-900 mb-3 capitalize">{category}</h3>
                    <div className="space-y-2">
                      {options.map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters[category].includes(option)}
                            onChange={() => toggleFilter(category, option)}
                            className="mr-2 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={project.logo}
                        alt={project.organization}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {project.organization}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.duration}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.type}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.applicants} applicants
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>Posted {project.postedDate}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={project.mentorAvatar}
                          alt={project.mentor}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-600">Mentored by</p>
                          <p className="text-sm font-medium text-gray-900">{project.mentor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {/* Save Project Button */}
                        <button
                          onClick={() => handleSaveProject(project.id, project.title)}
                          disabled={saveStatus.status === 'saving' && saveStatus.projectId === project.id}
                          className={`p-2 rounded-lg transition-colors ${
                            savedProjects.has(project.id)
                              ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-purple-600'
                          }`}
                          title={savedProjects.has(project.id) ? 'Remove from saved' : 'Save project'}
                        >
                          {saveStatus.status === 'saving' && saveStatus.projectId === project.id ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                          ) : savedProjects.has(project.id) ? (
                            <Heart className="w-5 h-5 fill-current" />
                          ) : (
                            <Heart className="w-5 h-5" />
                          )}
                        </button>

                        {/* View Details Button */}
                        <Link to={`/projects/${project.id}`}>
                          <Button variant="outline">View Details</Button>
                        </Link>

                        {/* Apply Button */}
                        {appliedProjects.has(project.id) ? (
                          <Button disabled className="bg-green-600 hover:bg-green-600 text-white">
                            <Check className="w-4 h-4 mr-2" />
                            Applied
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleApplyToProject(project.id, project.title)}
                            disabled={applicationStatus.status === 'applying' && applicationStatus.projectId === project.id}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {applicationStatus.status === 'applying' && applicationStatus.projectId === project.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Applying...
                              </>
                            ) : (
                              'Apply Now'
                            )}
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
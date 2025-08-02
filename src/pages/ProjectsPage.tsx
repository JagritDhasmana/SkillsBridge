import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Clock, MapPin, Users, Briefcase } from 'lucide-react'
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
    title: 'Create a Social Media Campaign for a New Product Launch',
    organization: 'EcoFriendly Co.',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
    mentor: 'Emily Rodriguez',
    mentorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    duration: '2 weeks',
    skills: ['Social Media', 'Content Creation', 'Digital Marketing'],
    description: 'Design and implement a social media campaign for our eco-friendly product launch. Create engaging content across multiple platforms.',
    applicants: 15,
    type: 'Remote',
    postedDate: '1 week ago',
  },
]

const filters = {
  skills: ['Marketing', 'Data Analysis', 'Design', 'Development', 'Content Creation'],
  duration: ['1-2 weeks', '3-4 weeks', '1-2 months', '3+ months'],
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.organization.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSkills = selectedFilters.skills.length === 0 ||
                         selectedFilters.skills.some(skill => project.skills.includes(skill))
    
    const matchesDuration = selectedFilters.duration.length === 0 ||
                           selectedFilters.duration.includes(project.duration)
    
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
                      <div className="flex space-x-3">
                        <Link to={`/projects/${project.id}`}>
                          <Button variant="outline">View Details</Button>
                        </Link>
                        <Button>Apply Now</Button>
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
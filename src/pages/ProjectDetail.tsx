import React from 'react'
import { useParams } from 'react-router-dom'
import { Clock, MapPin, Users, Calendar, Star, Briefcase } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'

const projectData = {
  id: 1,
  title: 'Develop a Marketing Strategy for a New Product Launch',
  organization: {
    name: 'TechStart Inc.',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200',
    description: 'A fast-growing tech startup focused on innovative solutions for small businesses.',
    website: 'https://techstart.com',
    employees: '50-100',
    founded: '2020'
  },
  mentor: {
    name: 'Ethan Carter',
    title: 'Senior Marketing Manager',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    experience: '8 years'
  },
  duration: '4 weeks',
  type: 'Remote',
  skills: ['Marketing Strategy', 'Market Research', 'Content Creation', 'Data Analysis'],
  description: `We are looking for a motivated student to help us develop a comprehensive marketing strategy for our upcoming product launch. This is an exciting opportunity to work directly with our marketing team and gain hands-on experience in product marketing.

You will be responsible for conducting market research, analyzing competitor strategies, identifying target audiences, and creating compelling marketing content. This project will give you exposure to real-world marketing challenges and the opportunity to see your work implemented in a live product launch.

The ideal candidate should have a strong interest in marketing, excellent research skills, and creative thinking abilities. Previous experience with marketing tools and analytics is a plus but not required.`,
  requirements: [
    'Strong interest in marketing and business strategy',
    'Excellent research and analytical skills',
    'Creative thinking and problem-solving abilities',
    'Good communication and presentation skills',
    'Familiarity with social media platforms',
    'Basic knowledge of marketing principles'
  ],
  deliverables: [
    'Market research report with competitor analysis',
    'Target audience personas and segmentation',
    'Marketing strategy document with recommendations',
    'Content calendar for product launch',
    'Social media campaign proposal',
    'Final presentation to the marketing team'
  ],
  applicants: 12,
  postedDate: '2 days ago',
  applicationDeadline: 'March 15, 2025'
}

export function ProjectDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={projectData.organization.logo}
                    alt={projectData.organization.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {projectData.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Briefcase className="w-5 h-5 mr-2" />
                      <span className="text-lg">{projectData.organization.name}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {projectData.duration}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {projectData.type}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {projectData.applicants} applicants
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Posted {projectData.postedDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projectData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 sm:flex-none">
                    Apply for This Project
                  </Button>
                  <Button variant="outline" size="lg">
                    Save Project
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {projectData.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {projectData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Expected Deliverables</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {projectData.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Application Info</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-600">Application Deadline</span>
                    <p className="font-medium text-gray-900">{projectData.applicationDeadline}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Current Applicants</span>
                    <p className="font-medium text-gray-900">{projectData.applicants} students</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Project Type</span>
                    <p className="font-medium text-gray-900">{projectData.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Duration</span>
                    <p className="font-medium text-gray-900">{projectData.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Organization Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={projectData.organization.logo}
                      alt={projectData.organization.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{projectData.organization.name}</h4>
                      <p className="text-sm text-gray-600">{projectData.organization.employees} employees</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{projectData.organization.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Founded</span>
                      <p className="font-medium">{projectData.organization.founded}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Size</span>
                      <p className="font-medium">{projectData.organization.employees}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Mentor Details</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={projectData.mentor.avatar}
                      alt={projectData.mentor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{projectData.mentor.name}</h4>
                      <p className="text-sm text-gray-600">{projectData.mentor.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(projectData.mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">{projectData.mentor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{projectData.mentor.experience}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
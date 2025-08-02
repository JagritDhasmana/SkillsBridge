import React from 'react'
import { useParams } from 'react-router-dom'
import { Star, MapPin, Calendar, Award, MessageSquare } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'

const mentorData = {
  id: 1,
  name: 'Ethan Carter',
  title: 'Senior Marketing Manager at TechStart Inc.',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  location: 'San Francisco, CA',
  experience: '8 years',
  rating: 4.8,
  totalReviews: 47,
  totalMentees: 156,
  about: 'I am a senior product manager with a passion for helping innovative startups. Product-market fit, growth hacking and go-to-market strategy. Product-market fit from day 1 up to seed series is where I make most impact. I have been product manager for 8 years.',
  expertise: [
    'Product Management',
    'User Experience',
    'Agile Development',
    'Digital Marketing',
    'AI & Machine Learning',
    'Startup Strategy'
  ],
  reviews: [
    {
      id: 1,
      author: 'Sarah Lin',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Ethan was incredibly helpful in helping me navigate my first product management role. His guidance on market research and strategy was invaluable.'
    },
    {
      id: 2,
      author: 'David Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '1 month ago',
      comment: 'Outstanding mentorship! Ethan provided practical advice that I could immediately apply to my startup. His expertise in go-to-market strategy is unmatched.'
    }
  ],
  mentoredProjects: [
    {
      id: 1,
      title: 'Mobile App for Sustainable Living',
      description: 'Developed a mobile application to help users track and reduce their environmental footprint through daily habit tracking.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'E-commerce Platform for Local Artisans',
      description: 'Created an online marketplace connecting local artisans with customers, featuring custom product showcases and integrated payment processing.',
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]
}

export function MentorProfile() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={mentorData.avatar}
                alt={mentorData.name}
                className="w-32 h-32 rounded-full mx-auto md:mx-0"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mentorData.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{mentorData.title}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {mentorData.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {mentorData.experience} experience
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {mentorData.totalMentees} mentees
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(mentorData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-semibold">{mentorData.rating}</span>
                    <span className="ml-2 text-gray-600">({mentorData.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button size="lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Request Mentorship
                  </Button>
                  <Button variant="outline" size="lg">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">About</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{mentorData.about}</p>
              </CardContent>
            </Card>

            {/* Mentored Projects */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Mentored Projects</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mentorData.mentoredProjects.map((project) => (
                    <div key={project.id} className="flex gap-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Ratings & Reviews</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mentorData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{review.author}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expertise */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Expertise</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mentorData.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Response Time</span>
                    <span className="font-semibold">2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects Completed</span>
                    <span className="font-semibold">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
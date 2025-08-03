import React from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Calendar, Award } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const mentorsData = [
  {
    id: 1,
    name: 'Ethan Carter',
    title: 'Senior Marketing Manager at TechStart Inc.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'San Francisco, CA',
    experience: '8 years',
    rating: 4.8,
    totalReviews: 47,
    totalMentees: 156,
    expertise: ['Product Management', 'Digital Marketing', 'Startup Strategy']
  },
  {
    id: 2,
    name: 'Sophia Rodriguez',
    title: 'Lead Software Engineer at Meta',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Seattle, WA',
    experience: '10 years',
    rating: 4.9,
    totalReviews: 62,
    totalMentees: 203,
    expertise: ['React & JavaScript', 'Node.js & Backend', 'Cloud Architecture']
  },
  {
    id: 3,
    name: 'Marcus Thompson',
    title: 'Data Science Director at Google',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Austin, TX',
    experience: '12 years',
    rating: 4.7,
    totalReviews: 38,
    totalMentees: 89,
    expertise: ['Machine Learning', 'Deep Learning', 'Data Analytics']
  },
  {
    id: 4,
    name: 'Jessica Kim',
    title: 'UX Design Lead at Adobe',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Los Angeles, CA',
    experience: '7 years',
    rating: 4.9,
    totalReviews: 54,
    totalMentees: 127,
    expertise: ['User Experience Design', 'Design Systems', 'User Research']
  },
  {
    id: 5,
    name: 'David Chen',
    title: 'Cybersecurity Consultant & CISO',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'New York, NY',
    experience: '15 years',
    rating: 4.8,
    totalReviews: 29,
    totalMentees: 67,
    expertise: ['Penetration Testing', 'Security Architecture', 'Ethical Hacking']
  }
]

export function MentorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Mentor</h1>
          <p className="text-gray-600">
            Connect with experienced professionals who can guide you through your learning journey and help you achieve your career goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorsData.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{mentor.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{mentor.title}</p>
                  
                  <div className="flex flex-col space-y-2 text-sm text-gray-600 mb-4 w-full">
                    <div className="flex items-center justify-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {mentor.experience} experience
                    </div>
                    <div className="flex items-center justify-center">
                      <Award className="w-4 h-4 mr-1" />
                      {mentor.totalMentees} mentees
                    </div>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-semibold">{mentor.rating}</span>
                    <span className="ml-1 text-sm text-gray-600">({mentor.totalReviews})</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {mentor.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Link to={`/mentors/${mentor.id}`} className="w-full">
                    <Button className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

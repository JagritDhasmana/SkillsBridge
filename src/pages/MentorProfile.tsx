import React from 'react'
import { useParams } from 'react-router-dom'
import { Star, MapPin, Calendar, Award, MessageSquare } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'

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
    about: 'Full-stack software engineer with extensive experience in building scalable web applications. I specialize in React, Node.js, and cloud architecture. My passion lies in mentoring junior developers and helping them grow their technical skills while building amazing products.',
    expertise: [
      'React & JavaScript',
      'Node.js & Backend',
      'Cloud Architecture',
      'System Design',
      'Microservices',
      'DevOps'
    ],
    reviews: [
      {
        id: 1,
        author: 'Michael Zhang',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '1 week ago',
        comment: 'Sophia\'s technical guidance was exceptional. She helped me understand complex system design concepts and provided hands-on coding experience.'
      },
      {
        id: 2,
        author: 'Emma Johnson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Amazing mentor! Sophia helped me transition from frontend to full-stack development. Her structured approach and patience made all the difference.'
      }
    ],
    mentoredProjects: [
      {
        id: 1,
        title: 'Real-time Chat Application',
        description: 'Built a scalable real-time messaging platform using React, Socket.io, and MongoDB with user authentication and file sharing capabilities.',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        title: 'Task Management Dashboard',
        description: 'Developed a comprehensive project management tool with drag-and-drop functionality, team collaboration features, and analytics.',
        image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
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
    about: 'Data scientist and machine learning expert with over a decade of experience in transforming business problems into data-driven solutions. I specialize in deep learning, NLP, and building ML pipelines at scale. I love teaching others how to leverage data for meaningful insights.',
    expertise: [
      'Machine Learning',
      'Deep Learning',
      'Python & R',
      'Data Visualization',
      'Natural Language Processing',
      'Big Data Analytics'
    ],
    reviews: [
      {
        id: 1,
        author: 'Lisa Park',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '5 days ago',
        comment: 'Marcus helped me understand complex ML algorithms and guided me through my first data science project. His explanations are clear and practical.'
      },
      {
        id: 2,
        author: 'James Wilson',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great mentor for anyone looking to break into data science. Marcus provided valuable insights into industry best practices and career guidance.'
      }
    ],
    mentoredProjects: [
      {
        id: 1,
        title: 'Customer Churn Prediction Model',
        description: 'Developed a machine learning model to predict customer churn using advanced feature engineering and ensemble methods, achieving 92% accuracy.',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        title: 'Sentiment Analysis Dashboard',
        description: 'Built an NLP-powered dashboard for analyzing social media sentiment in real-time using Python, NLTK, and interactive visualizations.',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
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
    about: 'Creative UX designer passionate about crafting intuitive and accessible digital experiences. I specialize in user research, design systems, and prototyping. My goal is to help aspiring designers develop both their technical skills and design thinking mindset.',
    expertise: [
      'User Experience Design',
      'User Interface Design',
      'Design Systems',
      'Prototyping',
      'User Research',
      'Accessibility'
    ],
    reviews: [
      {
        id: 1,
        author: 'Alex Rivera',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '4 days ago',
        comment: 'Jessica\'s design mentorship was transformative. She helped me develop a strong design portfolio and understand user-centered design principles.'
      },
      {
        id: 2,
        author: 'Rachel Green',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '1 week ago',
        comment: 'Outstanding mentor! Jessica provided detailed feedback on my designs and helped me land my first UX role. Highly recommended!'
      }
    ],
    mentoredProjects: [
      {
        id: 1,
        title: 'Healthcare Mobile App Redesign',
        description: 'Led a complete UX overhaul of a healthcare app, improving user engagement by 45% through better information architecture and accessibility.',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        title: 'E-learning Platform Design System',
        description: 'Created a comprehensive design system for an online education platform, ensuring consistency across 50+ screens and components.',
        image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
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
    about: 'Cybersecurity expert with 15 years of experience protecting organizations from digital threats. I specialize in penetration testing, security architecture, and incident response. I\'m passionate about educating the next generation of cybersecurity professionals.',
    expertise: [
      'Penetration Testing',
      'Security Architecture',
      'Incident Response',
      'Risk Assessment',
      'Compliance & Governance',
      'Ethical Hacking'
    ],
    reviews: [
      {
        id: 1,
        author: 'Kevin Lee',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '6 days ago',
        comment: 'David\'s cybersecurity expertise is unmatched. He guided me through complex security concepts and helped me prepare for industry certifications.'
      },
      {
        id: 2,
        author: 'Samantha Davis',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Excellent mentor for cybersecurity beginners. David\'s real-world experience and practical approach made learning security fundamentals engaging.'
      }
    ],
    mentoredProjects: [
      {
        id: 1,
        title: 'Network Security Assessment Tool',
        description: 'Developed a comprehensive network vulnerability scanner using Python and Nmap, helping organizations identify and remediate security gaps.',
        image: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        title: 'Security Awareness Training Platform',
        description: 'Built an interactive cybersecurity training platform with gamification elements to educate employees about phishing and social engineering.',
        image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ]
  }
]

export function MentorProfile() {
  const { id } = useParams()
  
  // Find the mentor by ID, default to first mentor if not found
  const mentorData = mentorsData.find(mentor => mentor.id === parseInt(id || '1')) || mentorsData[0]

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
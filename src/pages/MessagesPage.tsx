import { useState, useEffect } from 'react'
import { Search, Send, MoreVertical, Paperclip, Smile, Phone, Video, Info } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Sidebar } from '../components/layout/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface Message {
  id: number
  senderId: string
  senderName: string
  senderType: 'student' | 'organization' | 'mentor'
  content: string
  timestamp: string
  read: boolean
  type: 'text' | 'file' | 'image'
}

interface Conversation {
  id: number
  participantId: string
  participantName: string
  participantType: 'student' | 'organization' | 'mentor'
  participantAvatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  online: boolean
  projectContext?: string
}

export function MessagesPage() {
  const { userRole } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Sample conversations data
  const sampleConversations: Conversation[] = [
    {
      id: 1,
      participantId: 'mentor_001',
      participantName: 'Sarah Johnson',
      participantType: 'mentor',
      lastMessage: 'Great progress on the React components! Let me know if you need help with the state management.',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      online: true,
      projectContext: 'Mobile App Development'
    },
    {
      id: 2,
      participantId: 'org_001',
      participantName: 'TechForGood Inc.',
      participantType: 'organization',
      lastMessage: 'We\'d like to schedule an interview for the mobile app project. Are you available this week?',
      lastMessageTime: '1 hour ago',
      unreadCount: 1,
      online: false,
      projectContext: 'Educational Platform Project'
    },
    {
      id: 3,
      participantId: 'mentor_002',
      participantName: 'Dr. Michael Chen',
      participantType: 'mentor',
      lastMessage: 'The data analysis approach looks solid. Have you considered using clustering algorithms?',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      online: true,
      projectContext: 'Environmental Impact Study'
    },
    {
      id: 4,
      participantId: 'student_001',
      participantName: 'Alex Rodriguez',
      participantType: 'student',
      lastMessage: 'Thanks for the collaboration on the blockchain project! The smart contract is working perfectly.',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      online: false,
      projectContext: 'Supply Chain Transparency'
    },
    {
      id: 5,
      participantId: 'org_002',
      participantName: 'Green Earth NGO',
      participantType: 'organization',
      lastMessage: 'Your application has been reviewed. We\'re impressed with your portfolio!',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      online: false,
      projectContext: 'Environmental Data Analysis'
    }
  ]

  // Sample messages for selected conversation
  const sampleMessages: Message[] = [
    {
      id: 1,
      senderId: 'mentor_001',
      senderName: 'Sarah Johnson',
      senderType: 'mentor',
      content: 'Hi! I\'ve reviewed your latest code submission for the mobile app project.',
      timestamp: '10:30 AM',
      read: true,
      type: 'text'
    },
    {
      id: 2,
      senderId: 'current_user',
      senderName: 'You',
      senderType: 'student',
      content: 'Thank you! I was wondering about the best approach for handling user authentication.',
      timestamp: '10:32 AM',
      read: true,
      type: 'text'
    },
    {
      id: 3,
      senderId: 'mentor_001',
      senderName: 'Sarah Johnson',
      senderType: 'mentor',
      content: 'Great question! For this project, I\'d recommend using Firebase Auth. It\'s secure and well-documented.',
      timestamp: '10:35 AM',
      read: true,
      type: 'text'
    },
    {
      id: 4,
      senderId: 'mentor_001',
      senderName: 'Sarah Johnson',
      senderType: 'mentor',
      content: 'I\'ll send you some resources and examples that might help.',
      timestamp: '10:36 AM',
      read: true,
      type: 'text'
    },
    {
      id: 5,
      senderId: 'current_user',
      senderName: 'You',
      senderType: 'student',
      content: 'That would be amazing! I really appreciate your guidance.',
      timestamp: '10:38 AM',
      read: true,
      type: 'text'
    },
    {
      id: 6,
      senderId: 'mentor_001',
      senderName: 'Sarah Johnson',
      senderType: 'mentor',
      content: 'Great progress on the React components! Let me know if you need help with the state management.',
      timestamp: '2 min ago',
      read: false,
      type: 'text'
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Try to fetch from database first
        if (supabase) {
          // In a real app, you'd fetch conversations and messages here
          // For now, we'll use sample data
          setConversations(sampleConversations)
        } else {
          setConversations(sampleConversations)
        }
      } catch (error) {
        console.error('Error fetching conversations:', error)
        setConversations(sampleConversations)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setMessages(sampleMessages)
    
    // Mark messages as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    )
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: messages.length + 1,
      senderId: 'current_user',
      senderName: 'You',
      senderType: userRole as 'student' | 'organization',
      content: newMessage,
      timestamp: 'Just now',
      read: true,
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Update conversation list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: newMessage, lastMessageTime: 'Just now' }
          : conv
      )
    )
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getParticipantTypeColor = (type: string) => {
    switch (type) {
      case 'mentor':
        return 'bg-green-100 text-green-700'
      case 'organization':
        return 'bg-blue-100 text-blue-700'
      case 'student':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Conversations List */}
          <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredConversations.length > 0 ? (
                <div className="space-y-1 p-2">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-blue-50 border-l-4 border-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-lg">
                                {conversation.participantName.charAt(0)}
                              </span>
                            </div>
                            {conversation.online && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {conversation.participantName}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getParticipantTypeColor(conversation.participantType)}`}>
                                {conversation.participantType}
                              </span>
                            </div>
                            {conversation.projectContext && (
                              <p className="text-xs text-blue-600 mb-1">{conversation.projectContext}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium">No conversations found</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {selectedConversation.participantName.charAt(0)}
                        </span>
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedConversation.participantName}</h2>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getParticipantTypeColor(selectedConversation.participantType)}`}>
                          {selectedConversation.participantType}
                        </span>
                        {selectedConversation.online ? (
                          <span className="text-xs text-green-600">Online</span>
                        ) : (
                          <span className="text-xs text-gray-500">Offline</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === 'current_user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}>
                        {message.senderId !== 'current_user' && (
                          <p className="text-xs font-medium mb-1 text-gray-500">{message.senderName}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'current_user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Send className="w-12 h-12 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Welcome to Messages</h2>
                  <p className="text-lg mb-4">Select a conversation to start messaging</p>
                  <p className="text-sm">Connect with mentors, organizations, and fellow students to collaborate on projects</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

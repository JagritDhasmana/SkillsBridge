import React, { useState } from 'react'
import { Trophy, Medal, Award, Star } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../components/ui/Card'

const rewards = [
  {
    name: 'SkillBridge T-Shirt',
    image: 'https://res.cloudinary.com/dbsfkhatc/image/upload/v1754207200/TshirtSB_h8mmcz.jpg',
    type: 'Wearable',
  },
  {
    name: 'SkillBridge Phone Cover',
    image: 'https://res.cloudinary.com/dbsfkhatc/image/upload/v1754207193/PhoneCoverSB_jy6wl0.jpg',
    type: 'Accessory',
  },
  {
    name: 'SkillBridge Mug',
    image: 'https://res.cloudinary.com/dbsfkhatc/image/upload/v1754207184/MugSB_wcmefh.jpg',
    type: 'Accessory',
  },
]

const leaderboardData = {
  overall: [
    {
      rank: 1,
      name: 'Sophia Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 12,
      points: 1250,
      badge: 'Gold',
    },
    {
      rank: 2,
      name: 'Ethan Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 10,
      points: 1180,
      badge: 'Silver',
    },
    {
      rank: 3,
      name: 'Maya Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 9,
      points: 1050,
      badge: 'Bronze',
    },
    {
      rank: 4,
      name: 'Alex Kim',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 8,
      points: 950,
      badge: null,
    },
    {
      rank: 5,
      name: 'Liam Parker',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 7,
      points: 890,
      badge: null,
    },
    {
      rank: 6,
      name: 'Zoe Williams',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 6,
      points: 820,
      badge: null,
    },
    {
      rank: 7,
      name: 'Noah Garcia',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 6,
      points: 780,
      badge: null,
    },
    {
      rank: 8,
      name: 'Isabella Scott',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 5,
      points: 720,
      badge: null,
    },
    {
      rank: 9,
      name: 'Oliver Brown',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 5,
      points: 680,
      badge: null,
    },
    {
      rank: 10,
      name: 'Ava Davis',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 4,
      points: 640,
      badge: null,
    },
  ],
  month: [
    {
      rank: 1,
      name: 'Maya Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 5,
      points: 580,
      badge: 'Gold',
    },
    {
      rank: 2,
      name: 'Alex Kim',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 4,
      points: 520,
      badge: 'Silver',
    },
    {
      rank: 3,
      name: 'Sophia Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 4,
      points: 490,
      badge: 'Bronze',
    },
    {
      rank: 4,
      name: 'Liam Parker',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 3,
      points: 420,
      badge: null,
    },
    {
      rank: 5,
      name: 'Zoe Williams',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 3,
      points: 380,
      badge: null,
    },
    {
      rank: 6,
      name: 'Ethan Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 2,
      points: 320,
      badge: null,
    },
    {
      rank: 7,
      name: 'Isabella Scott',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 2,
      points: 290,
      badge: null,
    },
    {
      rank: 8,
      name: 'Noah Garcia',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 2,
      points: 260,
      badge: null,
    },
    {
      rank: 9,
      name: 'Oliver Brown',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 180,
      badge: null,
    },
    {
      rank: 10,
      name: 'Ava Davis',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 120,
      badge: null,
    },
  ],
  week: [
    {
      rank: 1,
      name: 'Liam Parker',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 2,
      points: 240,
      badge: 'Gold',
    },
    {
      rank: 2,
      name: 'Zoe Williams',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 2,
      points: 220,
      badge: 'Silver',
    },
    {
      rank: 3,
      name: 'Noah Garcia',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 180,
      badge: 'Bronze',
    },
    {
      rank: 4,
      name: 'Maya Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 150,
      badge: null,
    },
    {
      rank: 5,
      name: 'Isabella Scott',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 140,
      badge: null,
    },
    {
      rank: 6,
      name: 'Alex Kim',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 120,
      badge: null,
    },
    {
      rank: 7,
      name: 'Oliver Brown',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 1,
      points: 100,
      badge: null,
    },
    {
      rank: 8,
      name: 'Sophia Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 0,
      points: 80,
      badge: null,
    },
    {
      rank: 9,
      name: 'Ethan Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 0,
      points: 60,
      badge: null,
    },
    {
      rank: 10,
      name: 'Ava Davis',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      projects: 0,
      points: 40,
      badge: null,
    },
  ],
}

export function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'overall' | 'month' | 'week'>('overall')

  const tabs = [
    { key: 'overall', label: 'All-time' },
    { key: 'month', label: 'This Month' },
    { key: 'week', label: 'This Week' },
  ]

  const getBadgeIcon = (badge: string | null, rank: number) => {
    if (badge === 'Gold' || rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (badge === 'Silver' || rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (badge === 'Bronze' || rank === 3) return <Award className="w-5 h-5 text-amber-600" />
    return null
  }

  const getRowStyles = (rank: number) => {
    if (rank <= 3) {
      return 'bg-gradient-to-r from-yellow-50 to-transparent border-l-4 border-yellow-400'
    }
    return 'hover:bg-gray-50'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-gray-600">
            See who's leading the pack by project completions and track where you fit in the community standings.
          </p>
        </div>

        {/* Rewards Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rewards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 pt-8">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover mt-4"
                  />
                  <h3 className="font-medium text-gray-900 mb-1">{reward.name}</h3>
                  <p className="text-sm text-gray-600">{reward.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Rankings</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points Earned
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboardData[activeTab].map((student) => (
                    <tr key={student.rank} className={getRowStyles(student.rank)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900 mr-2">
                            {student.rank}
                          </span>
                          {getBadgeIcon(student.badge, student.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            {student.badge && (
                              <div className="text-xs text-gray-500">
                                {student.badge} Member
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-2">
                            {student.projects}
                          </span>
                          <div className="flex">
                            {[...Array(Math.min(student.projects, 5))].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
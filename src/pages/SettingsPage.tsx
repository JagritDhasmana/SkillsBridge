import React, { useState } from 'react'
import { User, Mail, Lock, Bell, Globe } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

export function SettingsPage() {
  const { user, userRole } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile')

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'account', label: 'Account', icon: Mail },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'privacy', label: 'Privacy', icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Change Photo</Button>
                          <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      {userRole === 'student' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              University/School
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your university or school"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Major/Field of Study
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter your major or field of study"
                            />
                          </div>
                        </>
                      )}

                      {userRole === 'organization' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Organization Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter organization name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Industry
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>Technology</option>
                              <option>Healthcare</option>
                              <option>Education</option>
                              <option>Non-profit</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </>
                      )}

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled
                        />
                        <p className="text-sm text-gray-500 mt-1">Your email address cannot be changed.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Type
                        </label>
                        <div className="flex items-center space-x-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                            {userRole}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Update Password</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'new-projects', label: 'New project matches', description: 'Get notified when new projects match your skills' },
                            { id: 'applications', label: 'Application updates', description: 'Updates on your project applications' },
                            { id: 'messages', label: 'New messages', description: 'When you receive new messages' },
                            { id: 'deadlines', label: 'Application deadlines', description: 'Reminders for upcoming deadlines' },
                          ].map((notification) => (
                            <div key={notification.id} className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id={notification.id}
                                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                defaultChecked
                              />
                              <div className="flex-1">
                                <label htmlFor={notification.id} className="text-sm font-medium text-gray-900">
                                  {notification.label}
                                </label>
                                <p className="text-sm text-gray-500">{notification.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                        <div className="space-y-4">
                          {[
                            { id: 'push-messages', label: 'Messages', description: 'Push notifications for new messages' },
                            { id: 'push-updates', label: 'Application updates', description: 'Push notifications for application status changes' },
                          ].map((notification) => (
                            <div key={notification.id} className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id={notification.id}
                                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="flex-1">
                                <label htmlFor={notification.id} className="text-sm font-medium text-gray-900">
                                  {notification.label}
                                </label>
                                <p className="text-sm text-gray-500">{notification.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <input
                              type="radio"
                              id="public"
                              name="visibility"
                              className="mt-1"
                              defaultChecked
                            />
                            <div className="flex-1">
                              <label htmlFor="public" className="text-sm font-medium text-gray-900">
                                Public Profile
                              </label>
                              <p className="text-sm text-gray-500">Your profile is visible to all users</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <input
                              type="radio"
                              id="private"
                              name="visibility"
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <label htmlFor="private" className="text-sm font-medium text-gray-900">
                                Private Profile
                              </label>
                              <p className="text-sm text-gray-500">Only organizations you apply to can see your profile</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Privacy</h3>
                        <div className="space-y-4">
                          <Button variant="outline">Download My Data</Button>
                          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                            Delete Account
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Settings</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
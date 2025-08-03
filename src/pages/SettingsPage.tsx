import React, { useState, useEffect } from 'react'
import { User, Mail, Lock, Bell, Globe } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export function SettingsPage() {
  const { user, userRole } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile')
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    university: '',
    major: '',
    organizationName: '',
    industry: 'Technology'
  })

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Loading states
  const [isSaving, setIsSaving] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Success/error messages
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Load existing profile data on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        
        // First, try to get basic profile info to check if table exists
        const { data: basicProfile, error: basicError } = await supabase
          .from('profiles')
          .select('id, email, role')
          .eq('id', user.id)
          .single()

        if (basicError && basicError.code !== 'PGRST116') {
          console.error('Error checking basic profile:', basicError)
          throw basicError
        }

        if (basicProfile) {
          // Try to get extended profile data
          try {
            const { data: extendedProfile, error: extendedError } = await supabase
              .from('profiles')
              .select('first_name, last_name, bio, university, major, organization_name, industry')
              .eq('id', user.id)
              .single()

            if (extendedError) {
              console.warn('Extended profile columns not available yet:', extendedError.message)
              // Fall back to user metadata
              const metadata = user.user_metadata || {}
              setProfileData({
                firstName: metadata.first_name || '',
                lastName: metadata.last_name || '',
                bio: metadata.bio || '',
                university: metadata.university || '',
                major: metadata.major || '',
                organizationName: metadata.organization_name || '',
                industry: metadata.industry || 'Technology'
              })
            } else {
              setProfileData({
                firstName: extendedProfile?.first_name || '',
                lastName: extendedProfile?.last_name || '',
                bio: extendedProfile?.bio || '',
                university: extendedProfile?.university || '',
                major: extendedProfile?.major || '',
                organizationName: extendedProfile?.organization_name || '',
                industry: extendedProfile?.industry || 'Technology'
              })
            }
          } catch (schemaError) {
            console.warn('Schema error, using metadata fallback:', schemaError)
            // Fall back to user metadata
            const metadata = user.user_metadata || {}
            setProfileData({
              firstName: metadata.first_name || '',
              lastName: metadata.last_name || '',
              bio: metadata.bio || '',
              university: metadata.university || '',
              major: metadata.major || '',
              organizationName: metadata.organization_name || '',
              industry: metadata.industry || 'Technology'
            })
          }
        } else {
          // No profile exists, use user metadata as fallback
          const metadata = user.user_metadata || {}
          setProfileData({
            firstName: metadata.first_name || '',
            lastName: metadata.last_name || '',
            bio: metadata.bio || '',
            university: metadata.university || '',
            major: metadata.major || '',
            organizationName: metadata.organization_name || '',
            industry: metadata.industry || 'Technology'
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        setMessage({ type: 'error', text: 'Failed to load profile data. Please run the database migration first.' })
        
        // Fall back to user metadata
        const metadata = user.user_metadata || {}
        setProfileData({
          firstName: metadata.first_name || '',
          lastName: metadata.last_name || '',
          bio: metadata.bio || '',
          university: metadata.university || '',
          major: metadata.major || '',
          organizationName: metadata.organization_name || '',
          industry: metadata.industry || 'Technology'
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [user])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      if (!user) throw new Error('No user found')

      console.log('Updating profile for user:', user.id)
      console.log('Profile data:', profileData)

      // First, try to save to user metadata (this always works)
      await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          bio: profileData.bio,
          university: profileData.university,
          major: profileData.major,
          organization_name: profileData.organizationName,
          industry: profileData.industry
        }
      })

      // Try to update/create profile in database if schema supports it
      try {
        const profileUpdate = {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          bio: profileData.bio,
          university: profileData.university,
          major: profileData.major,
          organization_name: profileData.organizationName,
          industry: profileData.industry,
          updated_at: new Date().toISOString()
        }

        // Check if profile exists first
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error checking existing profile:', fetchError)
          throw fetchError
        }

        if (existingProfile) {
          // Profile exists, try to update it
          console.log('Updating existing profile...')
          const { error: updateError } = await supabase
            .from('profiles')
            .update(profileUpdate)
            .eq('id', user.id)

          if (updateError) {
            console.error('Update error:', updateError)
            throw updateError
          }
          console.log('Database profile updated successfully!')
        } else {
          // Profile doesn't exist, try to create it
          console.log('Creating new profile...')
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email || '',
              role: userRole || 'student',
              ...profileUpdate
            })

          if (insertError) {
            console.error('Insert error:', insertError)
            throw insertError
          }
          console.log('Database profile created successfully!')
        }
      } catch (dbError: any) {
        console.warn('Database operation failed, but user metadata was saved:', dbError.message)
        
        if (dbError.message?.includes('bio') || dbError.message?.includes('column')) {
          setMessage({ 
            type: 'success', 
            text: 'Profile saved to user account! To enable full database features, please run the migration script in your Supabase SQL editor.' 
          })
          return
        }
        
        throw dbError
      }
      
      console.log('Profile updated successfully!')
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: any) {
      console.error('Error updating profile:', error)
      
      let errorMessage = 'Failed to update profile. Please try again.'
      
      if (error.message?.includes('permission denied')) {
        errorMessage = 'Permission denied. Please check your account permissions.'
      } else if (error.message?.includes('column') && error.message?.includes('does not exist')) {
        errorMessage = 'Database schema needs to be updated. Please run the migration script in your Supabase SQL editor.'
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingPassword(true)
    setMessage(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' })
      setIsUpdatingPassword(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' })
      setIsUpdatingPassword(false)
      return
    }

    try {
      // Update password in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      })

      if (error) throw error
      
      setMessage({ type: 'success', text: 'Password updated successfully!' })
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Error updating password:', error)
      setMessage({ type: 'error', text: 'Failed to update password. Please try again.' })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

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
                {message && (
                  <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                  </div>
                )}
                
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading profile...</span>
                      </div>
                    ) : (
                      <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="flex items-center space-x-6">
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-400" />
                          </div>
                          <div>
                            <Button type="button" variant="outline" size="sm">Change Photo</Button>
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
                              value={profileData.firstName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
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
                              value={profileData.lastName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
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
                            value={profileData.bio}
                            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
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
                                value={profileData.university}
                                onChange={(e) => setProfileData(prev => ({ ...prev, university: e.target.value }))}
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
                                value={profileData.major}
                                onChange={(e) => setProfileData(prev => ({ ...prev, major: e.target.value }))}
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
                                value={profileData.organizationName}
                                onChange={(e) => setProfileData(prev => ({ ...prev, organizationName: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter organization name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Industry
                              </label>
                              <select 
                                value={profileData.industry}
                                onChange={(e) => setProfileData(prev => ({ ...prev, industry: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Non-profit">Non-profit</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </>
                        )}

                        <div className="flex justify-end">
                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                {message && (
                  <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                  </div>
                )}
                
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              minLength={6}
                              required
                            />
                            <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters long.</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button type="submit" disabled={isUpdatingPassword}>
                              {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
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
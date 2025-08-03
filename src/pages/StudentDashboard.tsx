import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Clock, MapPin, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Sidebar } from '../components/layout/Sidebar'
import { supabase } from '../lib/supabase'

export function StudentDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) return;
      setLoading(true);
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .limit(3);
        if (projectsError) throw projectsError;
        setProjects(projectsData || []);

        const { data: applicationsData, error: applicationsError } = await supabase
          .from('applications')
          .select('*, projects(*)')
          .limit(2);
        if (applicationsError) throw applicationsError;
        setApplications(applicationsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sofia!</h1>
            <p className="text-gray-600">Discover new projects and continue building your skills.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Projects */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Recommended Projects</h2>
                  <Link to="/projects">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {project.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-1" />
                                {project.organization}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {project.duration}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {project.type}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4 flex flex-col items-end">
                            <Link to={`/projects/${project.id}`}>
                              <Button size="sm">Apply</Button>
                            </Link>
                            <span className="text-sm text-gray-500 mt-2 flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {project.applicants} applicants
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Application Status */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-medium text-gray-900 mb-1">{app.project}</h4>
                        <p className="text-sm text-gray-600 mb-2">{app.organization}</p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              app.status === 'Accepted'
                                ? 'bg-green-100 text-green-700'
                                : app.status === 'Under Review'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {app.status}
                          </span>
                          <span className="text-xs text-gray-500">{app.appliedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/applications">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Applications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projects Completed</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Rank</span>
                      <span className="font-semibold">#47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Points Earned</span>
                      <span className="font-semibold">245</span>
                    </div>
                  </div>
                  <Link to="/leaderboard">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View Leaderboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [searchBloodGroup, setSearchBloodGroup] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('all')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const donorProfile = {
    name: 'Alex Johnson',
    bloodGroup: 'O+',
    email: 'alex@university.edu',
    phone: '9876543210',
    totalDonations: 3,
    lastDonation: 'February 10, 2025',
    nextEligible: 'May 10, 2025',
    memberSince: 'August 2024',
    badges: ['Hero Donor', 'Regular', 'Community Champion']
  }

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Blood drive on April 15 at Student Center', date: 'April 15, 2025', type: 'event', read: false },
    { id: 2, message: 'Your last donation was 2 months ago. You are eligible to donate again!', date: 'Today', type: 'reminder', read: false },
    { id: 3, message: 'New blood donation record set! Thank you for being a donor.', date: 'Yesterday', type: 'achievement', read: true },
  ])

  const [donationHistory, setDonationHistory] = useState([
    { id: 1, date: 'Feb 10, 2025', location: 'Campus Drive', bloodGroup: 'O+', points: 100, status: 'completed' },
    { id: 2, date: 'Nov 15, 2024', location: 'Community Camp', bloodGroup: 'O+', points: 100, status: 'completed' },
    { id: 3, date: 'Aug 20, 2024', location: 'Health Center', bloodGroup: 'O+', points: 100, status: 'completed' },
  ])

  const [achievements, setAchievements] = useState([
    { title: 'First Donation', completed: true, icon: '🎯', date: 'Aug 2024' },
    { title: '3 Donations', completed: true, icon: '🏅', date: 'Feb 2025' },
    { title: '5 Donations', completed: false, icon: '⭐', progress: 60 },
    { title: '10 Donations', completed: false, icon: '🏆', progress: 30 },
  ])

  const [profile, setProfile] = useState(donorProfile)

  const allDonors = [
    { name: 'Sarah Chen', bloodGroup: 'A+', contact: 'sarah.chen@university.edu', lastActive: '2 weeks ago', verified: true },
    { name: 'Michael Brown', bloodGroup: 'O-', contact: 'michael.b@university.edu', lastActive: '1 month ago', verified: true },
    { name: 'Priya Patel', bloodGroup: 'B+', contact: 'priya.p@university.edu', lastActive: '3 days ago', verified: true },
    { name: 'James Wilson', bloodGroup: 'AB-', contact: 'james.w@university.edu', lastActive: '1 week ago', verified: false },
    { name: 'Emma Davis', bloodGroup: 'A-', contact: 'emma.d@university.edu', lastActive: 'Just now', verified: true },
    { name: 'Robert Kim', bloodGroup: 'O+', contact: 'robert.k@university.edu', lastActive: '5 days ago', verified: true },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Campus Blood Drive', date: 'Apr 15, 2025', location: 'Student Center', time: '10:00 AM - 4:00 PM' },
    { id: 2, title: 'Faculty Donation Camp', date: 'Apr 22, 2025', location: 'Staff Lounge', time: '9:00 AM - 3:00 PM' },
  ]

  const filteredDonors = allDonors.filter(donor => {
    const matchesBloodGroup = searchBloodGroup ? donor.bloodGroup === searchBloodGroup : true
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.contact.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesBloodGroup && matchesSearch
  })

  const getUnreadCount = () => notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const totalPoints = donationHistory.reduce((sum, d) => sum + d.points, 0)

  const handleEditProfile = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setProfile(prev => ({
      ...prev,
      name: formData.get('name') || prev.name,
      email: formData.get('email') || prev.email,
      phone: formData.get('phone') || prev.phone,
    }))
    setShowEditModal(false)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  return (
    <div className="mt-12 py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container-custom">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening with your donations and community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blood-500 to-blood-600 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">🩸</div>
            <div className="text-2xl font-bold">{profile.totalDonations}</div>
            <div className="text-xs opacity-90">Total Donations</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-xs opacity-90">Loyalty Points</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-xl font-bold">{profile.nextEligible}</div>
            <div className="text-xs opacity-90">Next Eligible</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xl font-bold">{profile.badges.length}</div>
            <div className="text-xs opacity-90">Badges Earned</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="p-6 relative overflow-hidden group" hover>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blood-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="text-center relative z-10">
                <div className="relative inline-block">
                  <div className="w-28 h-28 bg-gradient-to-br from-blood-100 to-blood-200 dark:from-blood-900/40 dark:to-blood-800/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-gray-700 shadow-lg">
                    <span className="text-5xl animate-pulse">🩸</span>
                  </div>
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-blood-600 rounded-full flex items-center justify-center text-white hover:bg-blood-700 transition shadow-lg"
                  >
                    ✏️
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                <div className="inline-block px-3 py-1 bg-blood-100 dark:bg-blood-900/30 rounded-full mt-2">
                  <p className="text-blood-600 dark:text-blood-400 font-semibold">{profile.bloodGroup}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-left">
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-lg">📧</span> {profile.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-lg">📞</span> {profile.phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-lg">💉</span> Total Donations: {profile.totalDonations}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-lg">📅</span> Last Donation: {profile.lastDonation}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-lg">🎗️</span> Member since: {profile.memberSince}
                  </p>
                </div>

                {/* Badges */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {profile.badges.map((badge, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🔔</span> Notifications
                  {getUnreadCount() > 0 && (
                    <span className="px-2 py-0.5 bg-blood-500 text-white text-xs rounded-full">{getUnreadCount()}</span>
                  )}
                </h3>
                <button onClick={markAllAsRead} className="text-xs text-blood-600 hover:text-blood-700">Mark all read</button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                      notif.read 
                        ? 'bg-gray-50 dark:bg-gray-700/30' 
                        : 'bg-blood-50 dark:bg-blood-900/20 border-l-4 border-blood-500'
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notif.date}</span>
                      {!notif.read && <span className="w-2 h-2 bg-blood-500 rounded-full animate-pulse" />}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Events Mini */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span>📅</span> Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.date} • {event.time}</p>
                    <button 
                      onClick={() => navigate('/events')}
                      className="mt-2 text-xs text-blood-600 hover:text-blood-700 font-semibold"
                    >
                      RSVP →
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievement Progress */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span>🏆</span> Achievement Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${
                      achievement.completed 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {achievement.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{achievement.title}</p>
                    {achievement.progress && (
                      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blood-500 h-1.5 rounded-full" style={{ width: `${achievement.progress}%` }} />
                      </div>
                    )}
                    {achievement.date && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{achievement.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Donation History */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <span>📋</span> Donation History
                </h3>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 dark:bg-gray-700"
                >
                  <option value="all">All Time</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <div className="space-y-3">
                {donationHistory.map(donation => (
                  <div key={donation.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blood-100 dark:bg-blood-900/30 rounded-full flex items-center justify-center">
                        <span className="text-lg">🩸</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{donation.date}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{donation.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blood-100 dark:bg-blood-900/30 text-blood-700 dark:text-blood-300 rounded text-sm font-semibold">
                        {donation.bloodGroup}
                      </span>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">+{donation.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Donor Search */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span>🔍</span> Find Blood Donors
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={searchBloodGroup}
                    onChange={(e) => setSearchBloodGroup(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blood-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Blood Groups</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Search by Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter donor name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blood-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredDonors.map((donor, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blood-100 dark:bg-blood-900/30 rounded-full flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {donor.name}
                          {donor.verified && <span className="ml-1 text-blue-500 text-xs">✓</span>}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{donor.contact}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Active {donor.lastActive}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-blood-100 dark:bg-blood-900/30 text-blood-700 dark:text-blood-300 rounded text-sm font-semibold">
                        {donor.bloodGroup}
                      </span>
                      <button className="block mt-2 text-xs text-blood-600 hover:text-blood-700">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
                {filteredDonors.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No donors found matching your criteria</p>
                    <button 
                      onClick={() => {
                        setSearchBloodGroup('')
                        setSearchTerm('')
                      }}
                      className="mt-2 text-sm text-blood-600 hover:text-blood-700"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 animate-zoom-in">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Profile</h3>
            <form onSubmit={handleEditProfile}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input name="name" type="text" defaultValue={profile.name} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input name="email" type="email" defaultValue={profile.email} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input name="phone" type="tel" defaultValue={profile.phone} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blood-600 text-white rounded-lg hover:bg-blood-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          ✓ Profile updated successfully!
        </div>
      )}
    </div>
  )
}
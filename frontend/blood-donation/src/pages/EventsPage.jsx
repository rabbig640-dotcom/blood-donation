// src/pages/EventsPage.jsx
import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [registeredEvents, setRegisteredEvents] = useState([])

  const events = [
    { 
      id: 1, 
      title: 'Campus Blood Drive', 
      date: 'April 15, 2025', 
      time: '10:00 AM - 4:00 PM', 
      location: 'Student Center Hall', 
      spots: 45,
      registered: 32,
      type: 'drive',
      organizer: 'Student Blood Donation Club',
      description: 'Join us for our monthly campus blood drive. All donors receive free snacks and a certificate.',
      image: '🏫',
      requirements: ['Age 18+', 'Weight 50kg+', 'Valid ID required']
    },
    { 
      id: 2, 
      title: 'Faculty & Staff Donation Camp', 
      date: 'April 22, 2025', 
      time: '9:00 AM - 3:00 PM', 
      location: 'Staff Lounge', 
      spots: 30,
      registered: 18,
      type: 'camp',
      organizer: 'University Health Services',
      description: 'Special donation camp for faculty and staff members. Priority registration available.',
      image: '👨‍🏫',
      requirements: ['Faculty/Staff ID', 'Health screening on site']
    },
    { 
      id: 3, 
      title: 'Weekend Community Drive', 
      date: 'April 28, 2025', 
      time: '11:00 AM - 5:00 PM', 
      location: 'Main Auditorium', 
      spots: 60,
      registered: 45,
      type: 'drive',
      organizer: 'Community Outreach Program',
      description: 'Open to all community members. Family-friendly event with activities for kids.',
      image: '🏘️',
      requirements: ['Age 18-65', 'Government ID']
    },
    { 
      id: 4, 
      title: 'Emergency Response Training', 
      date: 'May 5, 2025', 
      time: '2:00 PM - 6:00 PM', 
      location: 'Health Center', 
      spots: 25,
      registered: 12,
      type: 'training',
      organizer: 'Red Cross Partner Program',
      description: 'Learn emergency response techniques and basic life support. Certificate provided.',
      image: '🚑',
      requirements: ['Prior registration required', 'Comfortable clothing']
    },
    { 
      id: 5, 
      title: 'Rare Blood Type Drive', 
      date: 'May 12, 2025', 
      time: '10:00 AM - 2:00 PM', 
      location: 'Blood Donation Center', 
      spots: 20,
      registered: 8,
      type: 'drive',
      organizer: 'Rare Blood Registry',
      description: 'Special drive focused on O-negative, AB-negative, and other rare blood types.',
      image: '🩸',
      requirements: ['Blood type verification', 'Medical history review']
    },
    { 
      id: 6, 
      title: 'Health Awareness Workshop', 
      date: 'May 18, 2025', 
      time: '1:00 PM - 4:00 PM', 
      location: 'Lecture Hall B', 
      spots: 50,
      registered: 28,
      type: 'workshop',
      organizer: 'Health & Wellness Committee',
      description: 'Learn about blood health, nutrition, and maintaining healthy hemoglobin levels.',
      image: '📚',
      requirements: ['Open to all', 'Registration recommended']
    },
  ]

  const handleRSVP = (event) => {
    if (registeredEvents.includes(event.id)) {
      alert('You have already registered for this event!')
      return
    }
    setSelectedEvent(event)
    setShowModal(true)
  }

  const confirmRSVP = () => {
    if (selectedEvent) {
      setRegisteredEvents([...registeredEvents, selectedEvent.id])
      setShowModal(false)
      // In real app, this would make an API call
    }
  }

  const cancelRegistration = (eventId) => {
    setRegisteredEvents(registeredEvents.filter(id => id !== eventId))
  }

  const getFilteredEvents = () => {
    if (filterType === 'all') return events
    if (filterType === 'registered') return events.filter(e => registeredEvents.includes(e.id))
    if (filterType === 'upcoming') return events.filter(e => new Date(e.date) > new Date())
    return events.filter(e => e.type === filterType)
  }

  const filteredEvents = getFilteredEvents()
  const stats = {
    total: events.length,
    upcoming: events.filter(e => new Date(e.date) > new Date()).length,
    registered: registeredEvents.length,
    spotsLeft: events.reduce((sum, e) => sum + (e.spots - e.registered), 0)
  }

  return (
    <div className="mt-12 py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 bg-blood-100 dark:bg-blood-900/30 rounded-full">
            <span className="text-blood-600 dark:text-blood-400 text-sm font-semibold">📅 Join Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Upcoming Blood{' '}
            <span className="bg-gradient-to-r from-blood-600 to-blood-800 dark:from-blood-400 dark:to-blood-200 bg-clip-text text-transparent">
              Donation Drives
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Be a hero in someone's life. Join our blood donation events and make a difference in our community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blood-500 to-blood-600 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs opacity-90">Total Events</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-2xl font-bold">{stats.upcoming}</div>
            <div className="text-xs opacity-90">Upcoming</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">✓</div>
            <div className="text-2xl font-bold">{stats.registered}</div>
            <div className="text-xs opacity-90">You Registered</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white">
            <div className="text-2xl mb-1">🩸</div>
            <div className="text-2xl font-bold">{stats.spotsLeft}</div>
            <div className="text-xs opacity-90">Spots Left</div>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filterType === 'all' 
                  ? 'bg-blood-600 text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterType('registered')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filterType === 'registered' 
                  ? 'bg-blood-600 text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              My Registrations
            </button>
            <button
              onClick={() => setFilterType('upcoming')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                filterType === 'upcoming' 
                  ? 'bg-blood-600 text-white shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Upcoming Only
            </button>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-none focus:ring-2 focus:ring-blood-500"
            >
              <option value="all">All Types</option>
              <option value="drive">Blood Drives</option>
              <option value="camp">Donation Camps</option>
              <option value="training">Training</option>
              <option value="workshop">Workshops</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-blood-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              📱 Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-blood-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              📋 List
            </button>
          </div>
        </div>

        {/* Events Display */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or check back later for new events.</p>
            <button
              onClick={() => setFilterType('all')}
              className="mt-4 px-6 py-2 bg-blood-600 text-white rounded-lg hover:bg-blood-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const isRegistered = registeredEvents.includes(event.id)
              const spotsLeft = event.spots - event.registered
              const spotsPercentage = (event.registered / event.spots) * 100
              
              return (
                <Card key={event.id} className="overflow-hidden group" hover>
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-blood-500 to-blood-600 flex items-center justify-center">
                      <span className="text-6xl">{event.image}</span>
                    </div>
                    {isRegistered && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        ✓ Registered
                      </div>
                    )}
                    {spotsLeft < 10 && spotsLeft > 0 && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full animate-pulse">
                        Only {spotsLeft} spots left!
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <span>📅</span> {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>⏰</span> {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span> {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span> {event.registered}/{event.spots} registered
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blood-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${spotsPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {isRegistered ? (
                        <Button 
                          variant="outline" 
                          onClick={() => cancelRegistration(event.id)}
                          className="w-full"
                        >
                          Cancel Registration
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleRSVP(event)} 
                          className="w-full"
                          disabled={spotsLeft === 0}
                        >
                          {spotsLeft === 0 ? 'Fully Booked' : 'RSVP Now →'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredEvents.map(event => {
              const isRegistered = registeredEvents.includes(event.id)
              const spotsLeft = event.spots - event.registered
              
              return (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-blood-100 dark:bg-blood-900/30 rounded-full flex items-center justify-center text-2xl">
                        {event.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{event.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
                          <span>📅 {event.date}</span>
                          <span>⏰ {event.time}</span>
                          <span>📍 {event.location}</span>
                          <span>👥 {event.spots - event.registered} spots left</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      {isRegistered ? (
                        <Button 
                          variant="outline" 
                          onClick={() => cancelRegistration(event.id)}
                          className="text-sm px-4 py-2"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleRSVP(event)} 
                          className="text-sm px-4 py-2"
                          disabled={spotsLeft === 0}
                        >
                          {spotsLeft === 0 ? 'Full' : 'RSVP'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Calendar Preview Section */}
        <div className="mt-12 bg-gradient-to-r from-blood-50 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📅</span> Monthly Calendar View
          </h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => {
              const hasEvent = events.some(e => new Date(e.date).getDate() === i + 1)
              return (
                <div 
                  key={i} 
                  className={`text-sm py-2 rounded-lg transition-colors ${
                    hasEvent 
                      ? 'bg-blood-100 dark:bg-blood-900/30 text-blood-600 dark:text-blood-400 font-semibold cursor-pointer hover:bg-blood-200' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blood-600 to-blood-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Can't find a convenient time?</h3>
            <p className="text-blood-100 mb-4">Contact us to organize a blood drive in your department or hostel.</p>
            <button className="px-6 py-2 bg-white text-blood-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Request a Drive →
            </button>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm Registration">
        {selectedEvent && (
          <div>
            <div className="flex items-center gap-3 mb-4 p-3 bg-blood-50 dark:bg-blood-900/20 rounded-lg">
              <span className="text-3xl">{selectedEvent.image}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{selectedEvent.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedEvent.organizer}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span>📅</span> {selectedEvent.date} at {selectedEvent.time}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span>📍</span> {selectedEvent.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span>👥</span> {selectedEvent.registered} participants already registered
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Requirements:</p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {selectedEvent.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span>✓</span> {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mb-4">
              <p className="text-xs text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                <span>⚠️</span> Please bring a valid ID and eat a healthy meal before donating.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmRSVP} className="flex-1">
                Confirm RSVP
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
// src/pages/AboutPage.jsx
import { useState, useEffect, useRef } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom'

export default function AboutPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const timelineRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const benefits = [
    { 
      title: 'Saves Lives', 
      desc: 'One donation can save up to 3 lives. Your blood can be separated into red cells, plasma, and platelets.', 
      icon: '❤️',
      color: 'from-red-500 to-pink-500',
      stat: '3 Lives',
      statLabel: 'per donation'
    },
    { 
      title: 'Health Benefits', 
      desc: 'Regular donation reduces risk of heart disease, burns calories, and provides a free health screening.', 
      icon: '💪',
      color: 'from-blue-500 to-cyan-500',
      stat: '30 min',
      statLabel: 'donation time'
    },
    { 
      title: 'Free Checkup', 
      desc: 'Get your blood pressure, hemoglobin, temperature, and pulse checked before every donation.', 
      icon: '🩺',
      color: 'from-green-500 to-emerald-500',
      stat: '5+',
      statLabel: 'health checks'
    },
    { 
      title: 'Community Impact', 
      desc: 'Strengthen our university community and inspire others to join this life-saving mission.', 
      icon: '🏫',
      color: 'from-purple-500 to-indigo-500',
      stat: '2,847+',
      statLabel: 'donors strong'
    },
  ]

  const milestones = [
    { year: '2023', title: 'Initiative Launched', description: 'Started with 50 student volunteers', icon: '🚀', completed: true },
    { year: '2023', title: 'First Blood Drive', description: '100+ donations in first campus drive', icon: '🩸', completed: true },
    { year: '2024', title: 'Hospital Partnership', description: 'Tied up with 3 major hospitals', icon: '🏥', completed: true },
    { year: '2024', title: '1000 Donors', description: 'Reached milestone of 1000 registered donors', icon: '🎯', completed: true },
    { year: '2025', title: 'Community Outreach', description: 'Expanded to local community drives', icon: '🌍', completed: false },
    { year: '2025', title: 'Award Recognition', description: 'Recognized for social impact', icon: '🏆', completed: false },
  ]

  const teamMembers = [
    { name: 'Dr. Sarah Johnson', role: 'Medical Director', icon: '👩‍⚕️', bio: '15+ years of experience in transfusion medicine' },
    { name: 'Prof. Michael Chen', role: 'Faculty Coordinator', icon: '👨‍🏫', bio: 'Leading university health initiatives' },
    { name: 'Emma Williams', role: 'Student Lead', icon: '🎓', bio: 'Pre-med student and passionate volunteer' },
    { name: 'Dr. James Wilson', role: 'Blood Bank Consultant', icon: '👨‍⚕️', bio: 'Expert in blood donation safety protocols' },
  ]

  const faqs = [
    { q: 'Who can donate blood?', a: 'Healthy individuals aged 18-65, weighing at least 50kg, with normal hemoglobin levels.' },
    { q: 'How often can I donate?', a: 'Men can donate every 3 months, women every 4 months. Whole blood donation is safe with proper intervals.' },
    { q: 'Is blood donation safe?', a: 'Absolutely. All equipment is sterile and single-use. The process is supervised by medical professionals.' },
    { q: 'What should I do before donating?', a: 'Eat a healthy meal, drink plenty of water, get good sleep, and avoid fatty foods.' },
  ]

  // Intersection Observer for timeline animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blood-50 via-white to-blood-50 dark:from-gray-900 dark:via-gray-900 dark:to-blood-950 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              <span className="text-4xl">🩸</span>
            </div>
          ))}
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blood-100 dark:bg-blood-900/30 rounded-full">
            <span className="text-blood-600 dark:text-blood-400 text-sm font-semibold">📖 Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About Our{' '}
            <span className="bg-gradient-to-r from-blood-600 to-blood-800 dark:from-blood-400 dark:to-blood-200 bg-clip-text text-transparent">
              Initiative
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn why blood donation matters and how our university community is coming together 
            to make a lasting impact on healthcare in our region.
          </p>
        </div>
      </section>

      {/* Why Blood Donation Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4 px-3 py-1 bg-blood-50 dark:bg-blood-900/20 rounded-lg">
                <span className="text-blood-600 dark:text-blood-400 text-sm font-semibold">The Need</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Blood Donation Matters
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Every <span className="font-bold text-blood-600">2 seconds</span>, someone in the world needs blood. 
                  From accident victims to surgery patients, from cancer treatments to childbirth complications — 
                  blood saves lives. Yet hospitals face critical shortages daily.
                </p>
                <p>
                  Our university has launched this initiative to create a self-sustaining donor network among 
                  students and staff. With over <span className="font-bold text-blood-600">20,000 members</span> in our community, 
                  we can ensure that no patient goes without blood when they need it most.
                </p>
                <div className="bg-gradient-to-r from-blood-50 to-transparent dark:from-blood-950/30 p-4 rounded-lg">
                  <p className="text-blood-700 dark:text-blood-300 font-semibold italic">
                    "The gift of blood is the gift of life. One donation can save up to three lives."
                  </p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/register')}
                className="mt-6 px-6 py-3 bg-blood-600 text-white rounded-lg font-semibold hover:bg-blood-700 transition-all duration-300 transform hover:scale-105"
              >
                Become a Donor →
              </button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blood-400 to-blood-600 rounded-2xl blur-2xl opacity-20 animate-pulse" />
                <div className="relative bg-gradient-to-br from-blood-100 to-blood-200 dark:from-blood-900/40 dark:to-blood-800/20 rounded-2xl p-8 text-center">
                  <div className="text-9xl mb-4 animate-bounce-slow">🩸</div>
                  <p className="text-blood-700 dark:text-blood-300 font-semibold text-lg">
                    "Every drop counts"
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blood-600">8,541+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Lives Saved</div>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blood-600">2,847+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Active Donors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-blood-600 dark:text-blood-400 font-semibold text-sm uppercase tracking-wider">
              Why Donate
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Key Benefits of Blood Donation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Beyond saving lives, donating blood offers several health benefits and rewards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="p-6 text-center group hover:shadow-xl transition-all duration-300" hover>
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-4xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{benefit.desc}</p>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-blood-600">{benefit.stat}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{benefit.statLabel}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section ref={timelineRef} className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-blood-600 dark:text-blood-400 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Milestones Achieved
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Track our progress and see how we've grown over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blood-400 to-blood-600 rounded-full hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div 
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex-1 md:text-right">
                    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{milestone.icon}</span>
                        <div>
                          <span className="text-blood-600 font-bold">{milestone.year}</span>
                          <h3 className="font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{milestone.description}</p>
                      {milestone.completed && (
                        <span className="inline-block mt-2 text-xs text-green-600 dark:text-green-400">✓ Completed</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      milestone.completed 
                        ? 'bg-gradient-to-r from-blood-500 to-blood-600' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {idx + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 md:text-left">
                    {/* Empty div for spacing on desktop */}
                    <div className="hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* University Commitment */}
      <section className="py-16 bg-gradient-to-r from-blood-600 to-blood-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-3xl animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            >
              🫀
            </div>
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our University Commitment</h2>
            <p className="text-blood-100 max-w-2xl mx-auto">
              We're dedicated to creating a sustainable blood donation ecosystem on campus.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2 text-white">Student-led</h3>
              <p className="text-blood-100 text-sm">Managed by dedicated student volunteers</p>
              <div className="mt-4 text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-blood-200">Active Volunteers</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2 text-white">Partner Hospitals</h3>
              <p className="text-blood-100 text-sm">Tied with leading healthcare providers</p>
              <div className="mt-4 text-2xl font-bold text-white">3+</div>
              <div className="text-xs text-blood-200">Major Hospitals</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2 text-white">Monthly Drives</h3>
              <p className="text-blood-100 text-sm">Regular campus donation camps</p>
              <div className="mt-4 text-2xl font-bold text-white">12+</div>
              <div className="text-xs text-blood-200">Drives per Year</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-blood-600 dark:text-blood-400 font-semibold text-sm uppercase tracking-wider">
              Behind the Scenes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dedicated professionals and volunteers working tirelessly to make this initiative successful.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <Card key={idx} className="p-6 text-center group" hover>
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blood-100 to-blood-200 dark:from-blood-900/40 dark:to-blood-800/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{member.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{member.name}</h3>
                <p className="text-blood-600 dark:text-blood-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-blood-600 dark:text-blood-400 font-semibold text-sm uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about blood donation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveTab(activeTab === idx ? -1 : idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blood-600 transition-colors">
                    {faq.q}
                  </h3>
                  <span className="text-blood-600 transition-transform duration-300" style={{ transform: activeTab === idx ? 'rotate(180deg)' : 'rotate(0)' }}>
                    ▼
                  </span>
                </div>
                {activeTab === idx && (
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blood-500 to-blood-700">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-blood-100 mb-6 max-w-2xl mx-auto">
            Be part of something bigger. Register today and help us save lives.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-blood-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Register as Donor →
          </button>
        </div>
      </section>
    </div>
  )
}
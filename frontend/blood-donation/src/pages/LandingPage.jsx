// src/pages/LandingPage.jsx
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import CanvasBloodBackground from '../components/CanvasBloodBackground'
import SVGBloodBackground from '../components/SVGBloodBackground'
import AnimatedBloodBackground from '../components/AnimatedBloodBackground'

export default function LandingPage() {
  const navigate = useNavigate()
  const [animatedStats, setAnimatedStats] = useState({
    donors: 0,
    lives: 0,
    drives: 0,
    volunteers: 0
  })
  const statsRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const stats = [
    { label: 'Total Donors', value: 2847, icon: '🩸', key: 'donors', suffix: '+' },
    { label: 'Lives Saved', value: 8541, icon: '❤️', key: 'lives', suffix: '+' },
    { label: 'Upcoming Drives', value: 12, icon: '📅', key: 'drives', suffix: '' },
    { label: 'Active Volunteers', value: 456, icon: '🤝', key: 'volunteers', suffix: '+' },
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'University Health Services',
      quote: 'This initiative has transformed our campus blood supply. The dedication of student volunteers is remarkable.',
      avatar: '👩‍⚕️',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Student Donor',
      quote: 'Donating blood is the easiest way to make a huge impact. I\'ve donated 4 times and feel proud to be part of this.',
      avatar: '🎓',
      rating: 5
    },
    {
      name: 'Prof. Emily Rodriguez',
      role: 'Faculty Coordinator',
      quote: 'Seeing our university community come together for such a noble cause fills me with hope and pride.',
      avatar: '👩‍🏫',
      rating: 5
    }
  ]

  const features = [
    {
      title: 'Easy Registration',
      description: 'Sign up in less than 2 minutes and become a potential life-saver.',
      icon: '📝',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Free Health Checkup',
      description: 'Get your vitals checked every time you donate blood.',
      icon: '🩺',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Certificate of Honor',
      description: 'Receive recognition for your contribution to society.',
      icon: '🏆',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: '24/7 Support',
      description: 'Our team is always available to answer your questions.',
      icon: '💬',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  // Animated counter effect
  useEffect(() => {
    const timers = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          stats.forEach((stat) => {
            let start = 0
            const end = stat.value
            const duration = 2000
            const increment = end / (duration / 16)
            
            const timer = setInterval(() => {
              start += increment
              if (start >= end) {
                setAnimatedStats(prev => ({ ...prev, [stat.key]: end }))
                clearInterval(timer)
              } else {
                setAnimatedStats(prev => ({ ...prev, [stat.key]: Math.floor(start) }))
              }
            }, 16)
            timers.push(timer);
          })
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      observer.disconnect();
      timers.forEach(timer => clearInterval(timer));
    };
  }, [hasAnimated])

  return (
    <div className="relative overflow-hidden">
      {/* Background Options: Uncomment the one you prefer */}
      <CanvasBloodBackground />
      {/* <SVGBloodBackground /> */}
      {/* <AnimatedBloodBackground /> */}

      <div className="relative z-10">
        {/* Hero Section with Parallax Effect */}
        <section className="mt-12 relative bg-gradient-to-br from-blood-50/10 to-transparent py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blood-600 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blood-400 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          <div className="container-custom relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-1 bg-blood-100 dark:bg-blood-900/30 rounded-full">
              <span className="text-blood-600 dark:text-blood-400 text-sm font-semibold">🩸 Every Drop Counts</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 text-blood-800 dark:text-white">
              Donate Blood,{' '}
              <span className="bg-gradient-to-r from-blood-600 to-blood-800 dark:from-blood-400 dark:to-blood-200 bg-clip-text text-transparent">
                Save Lives
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blood-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our university's mission to ensure a steady blood supply for those in need. 
              Every donor can save up to <span className="font-bold text-blood-600">3 lives</span> with a single donation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/register')} className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Register as Donor →
              </Button>
              <Button variant="outline" onClick={() => navigate('/about')} className="text-lg px-8 py-3">
                Learn More
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 100% Safe
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> FDA Approved
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Free Refreshments
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Statistics Section with Counter */}
        <section ref={statsRef} className="py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Impact So Far
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Together, we're making a difference in our community. Here's what we've achieved.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <Card key={idx} className="text-center p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl" hover>
                  <div className="text-5xl mb-4 animate-bounce-slow">{stat.icon}</div>
                  <div className="text-4xl font-bold text-blood-600 dark:text-blood-400 mb-2">
                    {hasAnimated ? animatedStats[stat.key] : 0}{stat.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Donate With Us?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We make blood donation easy, rewarding, and impactful.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Community Says
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Hear from students, faculty, and staff who have participated in our initiative.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="p-6 relative" hover>
                  <div className="absolute top-4 right-4 text-4xl opacity-10">"</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blood-100 dark:bg-blood-900/30 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-20 bg-gradient-to-r from-blood-600 to-blood-700 dark:from-blood-800 dark:to-blood-900 overflow-hidden">
          {/* Animated background overlay for CTA */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          </div>
        
          <div className="container-custom relative z-10 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
              Ready to Make a Difference?
            </h2>
            <p className="text-blood-100 text-lg mb-8 max-w-2xl mx-auto">
              Your donation can bring hope to someone's family. Join thousands of students and staff who have already registered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/register')} 
                className="bg-white text-blood-600 hover:bg-gray-100 text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Register Now →
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/events')} 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                View Upcoming Events
              </Button>
            </div>
          
            {/* Call to action stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span>Only 1 hour of your time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">❤️</span>
                <span>Up to 3 lives saved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <span>Free snacks & drinks</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
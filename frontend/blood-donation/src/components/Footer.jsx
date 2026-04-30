// src/components/Footer.jsx
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com', color: 'hover:text-blue-700' },
  ]

  const quickLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: '📖' },
    { name: 'Register', path: '/register', icon: '📝' },
    { name: 'Events', path: '/events', icon: '📅' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  ]

  const resources = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Become a Volunteer', path: '/volunteer' },
  ]

  const stats = [
    { label: 'Total Donors', value: '2,847+' },
    { label: 'Lives Saved', value: '8,541+' },
    { label: 'Blood Drives', value: '45+' },
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group inline-flex">
              <div className="w-10 h-10 bg-gradient-to-br from-blood-500 to-blood-700 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-lg">
                <span className="text-white font-bold text-lg animate-pulse">🩸</span>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blood-600 to-blood-800 dark:from-blood-400 dark:to-blood-200 bg-clip-text text-transparent">
                LifeShare
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              University blood donation initiative. Every drop counts. Together, we can save lives.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-md`}
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-blood-600">⚡</span> Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blood-600 dark:hover:text-blood-400 transition-all duration-200 group"
                  >
                    <span className="text-sm group-hover:translate-x-1 transition-transform">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-blood-600">📚</span> Resources
            </h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.path}>
                  <Link
                    to={resource.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-blood-600 dark:hover:text-blood-400 transition-all duration-200 hover:pl-1 block"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Stats */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-blood-600">📧</span> Stay Updated
            </h3>
            
            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blood-500 focus:border-blood-500 dark:bg-gray-700 dark:text-white text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blood-600 text-white rounded-lg hover:bg-blood-700 transition-all duration-200 hover:scale-105 text-sm font-semibold"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-green-600 dark:text-green-400 text-xs mt-2 animate-fade-in">
                  ✓ Subscribed successfully!
                </p>
              )}
            </form>

            {/* Quick Stats */}
            <div className="space-y-2">
              {stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                  <span className="font-bold text-blood-600 dark:text-blood-400">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>📍</span>
                <span>University Campus, Main Building</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>✉️</span>
                <span>support@lifeshare.edu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} LifeShare - University Blood Donation Initiative. 
              <span className="hidden md:inline"> All rights reserved.</span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blood-600 dark:hover:text-blood-400 transition">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blood-600 dark:hover:text-blood-400 transition">
                Terms
              </Link>
              <Link to="/accessibility" className="text-gray-500 dark:text-gray-400 hover:text-blood-600 dark:hover:text-blood-400 transition">
                Accessibility
              </Link>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blood-600 dark:hover:text-blood-400 transition group"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <span className="group-hover:translate-y-[-2px] transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
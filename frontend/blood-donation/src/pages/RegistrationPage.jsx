// src/pages/RegistrationPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Modal from '../components/Modal'

export default function RegistrationPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    // Contact Information
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    // Medical Information
    weight: '',
    hasDonatedBefore: '',
    lastDonationDate: '',
    medicalConditions: [],
    medications: [],
    // Consent
    agreeTerms: false,
    agreePrivacy: false,
    subscribeNewsletter: true,
  })
  const [errors, setErrors] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)
  const [eligibilityStatus, setEligibilityStatus] = useState(null)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  const medicalConditionsList = [
    'Diabetes', 'High Blood Pressure', 'Heart Condition', 'Anemia',
    'Thyroid Disorder', 'Hepatitis', 'HIV/AIDS', 'Cancer',
    'None of the above'
  ]
  const medicationsList = [
    'Blood Thinners', 'Antibiotics', 'Insulin', 'Steroids',
    'Antidepressants', 'None of the above'
  ]

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    const age = parseInt(formData.age)
    if (!formData.age) newErrors.age = 'Age is required'
    else if (isNaN(age) || age < 18) newErrors.age = 'You must be at least 18 years old'
    else if (age > 65) newErrors.age = 'Age must be 65 or below'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits'
    if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}
    if (!formData.weight) newErrors.weight = 'Weight is required'
    else if (parseInt(formData.weight) < 50) newErrors.weight = 'Minimum weight required is 50kg'
    
    if (formData.hasDonatedBefore === 'yes' && !formData.lastDonationDate) {
      newErrors.lastDonationDate = 'Please provide last donation date'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = () => {
    const newErrors = {}
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions'
    if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkEligibility = () => {
    const age = parseInt(formData.age) || 0
    const weight = parseInt(formData.weight) || 0
    const hasMedicalIssues = formData.medicalConditions.some(c => c !== 'None of the above')
    const onMedications = formData.medications.some(m => m !== 'None of the above')
    
    let status = 'eligible'
    let message = ''
    
    if (!age || age < 18) {
      status = 'ineligible'
      message = 'You must be at least 18 years old to donate blood.'
    } else if (age > 65) {
      status = 'ineligible'
      message = 'Donors over 65 require special medical clearance.'
    } else if (!weight || weight < 50) {
      status = 'ineligible'
      message = 'Minimum weight requirement for blood donation is 50kg.'
    } else if (hasMedicalIssues || onMedications) {
      status = 'needs_review'
      message = 'Based on your medical history, we recommend consulting with our medical team before donation.'
    } else {
      status = 'eligible'
      message = 'You are eligible to donate blood! Thank you for your willingness to save lives.'
    }
    
    setEligibilityStatus({ status, message })
    setShowEligibilityModal(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep4()) {
      checkEligibility()
    }
  }

  const completeRegistration = () => {
    setShowEligibilityModal(false)
    if (eligibilityStatus?.status === 'eligible' || eligibilityStatus?.status === 'needs_review') {
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        navigate('/dashboard')
      }, 2000)
    }
  }

  const nextStep = () => {
    let isValid = false
    if (step === 1) isValid = validateStep1()
    else if (step === 2) isValid = validateStep2()
    else if (step === 3) isValid = validateStep3()
    
    if (isValid) setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  const getStepProgress = () => ((step - 1) / 3) * 100

  return (
    <div className="mt-12 py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 min-h-screen">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-4 py-1 bg-blood-100 dark:bg-blood-900/30 rounded-full">
            <span className="text-blood-600 dark:text-blood-400 text-sm font-semibold">Join Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Become a<span className="bg-gradient-to-r from-blood-600 to-blood-800 bg-clip-text text-transparent"> Blood Donor</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join our life-saving community. Your donation can save up to 3 lives.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
            <span className={step >= 1 ? 'text-blood-600 font-semibold' : ''}>Personal</span>
            <span className={step >= 2 ? 'text-blood-600 font-semibold' : ''}>Contact</span>
            <span className={step >= 3 ? 'text-blood-600 font-semibold' : ''}>Medical</span>
            <span className={step >= 4 ? 'text-blood-600 font-semibold' : ''}>Consent</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blood-500 to-blood-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tell us about yourself</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 focus:border-blood-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="18-65 years"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.age ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map(bg => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, bloodGroup: bg }));
                        setErrors(prev => ({ ...prev, bloodGroup: '' }));
                      }}
                      className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                        formData.bloodGroup === bg
                          ? 'bg-blood-600 text-white border-blood-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blood-500'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
                {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">How to reach you</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@university.edu"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Your full address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blood-500 focus:border-blood-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Emergency Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name and phone number of emergency contact"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                />
                {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Medical Information */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Medical Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Health screening details</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Minimum 50kg"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.weight ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                  {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Donated Before?
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasDonatedBefore"
                        value="yes"
                        checked={formData.hasDonatedBefore === 'yes'}
                        onChange={handleChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasDonatedBefore"
                        value="no"
                        checked={formData.hasDonatedBefore === 'no'}
                        onChange={handleChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              {formData.hasDonatedBefore === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blood-500 ${errors.lastDonationDate ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  />
                  {errors.lastDonationDate && <p className="text-red-500 text-sm mt-1">{errors.lastDonationDate}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Conditions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {medicalConditionsList.map(condition => (
                    <label key={condition} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.medicalConditions.includes(condition)}
                        onChange={() => handleMultiSelect('medicalConditions', condition)}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Medications
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {medicationsList.map(med => (
                    <label key={med} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.medications.includes(med)}
                        onChange={() => handleMultiSelect('medications', med)}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{med}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Consent */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Terms & Consent</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please read and confirm</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  I confirm that all information provided is accurate and complete. I understand that:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                  <li>Blood donation is voluntary and I can withdraw at any time</li>
                  <li>My blood will be tested for infectious diseases</li>
                  <li>I will be informed if any abnormalities are found</li>
                  <li>My information will be kept confidential</li>
                </ul>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the <button type="button" className="text-blood-600 hover:underline">Terms and Conditions</button>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the <button type="button" className="text-blood-600 hover:underline">Privacy Policy</button>
                </span>
              </label>
              {errors.agreePrivacy && <p className="text-red-500 text-sm mt-1">{errors.agreePrivacy}</p>}

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Subscribe to newsletter for upcoming blood drives and health tips
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            {step > 1 && (
              <Button type="button" variant="secondary" onClick={prevStep}>
                ← Back
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Continue →
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Submit Registration →
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="🎉 Registration Successful!">
        <div className="text-center">
          <div className="text-6xl mb-4">🩸</div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Thank you for registering as a blood donor!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            You'll be redirected to your dashboard where you can view upcoming events and track your donations.
          </p>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div className="bg-blood-600 h-1 rounded-full animate-progress" style={{ width: '100%' }} />
          </div>
        </div>
      </Modal>

      {/* Eligibility Modal */}
      {showEligibilityModal && eligibilityStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 animate-zoom-in">
            <div className="text-center">
              <div className={`text-5xl mb-4 ${
                eligibilityStatus.status === 'eligible' ? 'text-green-500' : 
                eligibilityStatus.status === 'ineligible' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {eligibilityStatus.status === 'eligible' ? '✅' : 
                 eligibilityStatus.status === 'ineligible' ? '❌' : '⚠️'}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {eligibilityStatus.status === 'eligible' ? 'You are Eligible!' :
                 eligibilityStatus.status === 'ineligible' ? 'Not Eligible at this Time' : 'Needs Medical Review'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {eligibilityStatus.message}
              </p>
              
              <div className="flex gap-3">
                {eligibilityStatus.status === 'eligible' ? (
                  <>
                    <Button variant="secondary" onClick={() => setShowEligibilityModal(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={completeRegistration} className="flex-1">
                      Complete Registration
                    </Button>
                  </>
                ) : eligibilityStatus.status === 'ineligible' ? (
                  <Button onClick={() => setShowEligibilityModal(false)} className="w-full">
                    Close
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" onClick={() => setShowEligibilityModal(false)} className="flex-1">
                      Edit Information
                    </Button>
                    <Button onClick={completeRegistration} className="flex-1">
                      Proceed Anyway
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
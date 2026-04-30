// src/components/Button.jsx
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer'
  
  const variants = {
    primary: 'bg-blood-600 text-white hover:bg-blood-700 focus:ring-blood-500 dark:focus:ring-blood-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    outline: 'border-2 border-blood-600 text-blood-600 hover:bg-blood-50 focus:ring-blood-500 dark:border-blood-400 dark:text-blood-400 dark:hover:bg-blood-900/20',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
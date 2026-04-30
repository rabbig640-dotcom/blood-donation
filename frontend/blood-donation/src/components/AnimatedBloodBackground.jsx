// src/components/AnimatedBloodBackground.jsx
import { useEffect, useState } from 'react'

export default function AnimatedBloodBackground() {
  const [bloodDrops, setBloodDrops] = useState([])

  useEffect(() => {
    // Create multiple blood drops with random positions and animations
    const drops = []
    const dropCount = 20
    
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 30 + 20,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 10,
        opacity: Math.random() * 0.2 + 0.05,
        rotation: Math.random() * 360
      })
    }
    setBloodDrops(drops)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bloodDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute animate-float-blood"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            opacity: drop.opacity,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            transform: `rotate(${drop.rotation}deg)`
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-blood-600/20 dark:text-blood-400/20">
            <path d="M12 2C12 2 6 9 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9 12 2 12 2Z"/>
          </svg>
        </div>
      ))}
    </div>
  )
}
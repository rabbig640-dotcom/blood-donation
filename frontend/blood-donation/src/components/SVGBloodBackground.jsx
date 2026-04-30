// src/components/SVGBloodBackground.jsx
import { useMemo } from 'react'

export default function SVGBloodBackground() {
  const drops = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 10 + 8}s`,
      color: `rgba(220, 38, 38, ${Math.random() * 0.3 + 0.1})`
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="bloodDrop"
            d="M20,12c0,4.4-3.6,8-8,8s-8-3.6-8-8c0-2.4,1.6-5.6,4-8.5c1.6-1.9,3.2-3.5,4-3.5c0.8,0,2.4,1.6,4,3.5 C18.4,6.4,20,9.6,20,12z"
            fill="currentColor"
          />
          
          <g id="animatedDrop">
            <use href="#bloodDrop" className="animate-float-blood-svg">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 50,-200; -50,-400; 0,-600"
                dur="10s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.3;0.6;0.3;0"
                dur="10s"
                repeatCount="indefinite"
              />
            </use>
          </g>
        </defs>
        
        {drops.map((drop) => (
          <use
            key={drop.id}
            href="#animatedDrop"
            x={drop.x}
            y={drop.y}
            style={{
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              color: drop.color
            }}
          />
        ))}
      </svg>
    </div>
  )
}
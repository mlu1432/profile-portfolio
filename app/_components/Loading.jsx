/** Modern Loading Component
 *  Description: A sleek, modern loading animation with brand colors and initials
 */

'use client'

import { useEffect, useRef, useState } from 'react'

export default function Loading({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    
    // Simulate loading completion after 3 seconds
    const finishTimeout = setTimeout(() => {
      if (finishLoading) finishLoading()
    }, 3000)
    
    return () => {
      clearTimeout(timeout)
      clearTimeout(finishTimeout)
    }
  }, [finishLoading])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-primary-blue dark:bg-darkTheme z-50 transition-opacity duration-500"
      style={{ opacity: isMounted ? 1 : 0 }}
    >
      <div className="relative">
        {/* Animated circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-24 h-24 border-2 border-light-yellow/30 rounded-full animate-ping"></div>
          <div 
            className="absolute w-32 h-32 border-2 border-light-yellow/20 rounded-full"
            style={{ 
              animation: 'pulse 2s infinite ease-in-out',
              animationDelay: '0.5s'
            }}
          ></div>
        </div>
        
        {/* Initials "LS" */}
        <div className="relative z-10 flex items-center justify-center w-20 h-20">
          <span className="text-4xl font-bold text-light-yellow">LS</span>
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center mt-8 space-x-1">
          {[0, 1, 2].map(i => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-light-yellow"
              style={{
                animation: `bounce 1.5s infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
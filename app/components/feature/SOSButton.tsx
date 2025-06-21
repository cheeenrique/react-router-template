import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router'

export const SOSButton: React.FC = () => {
  return (
    <Link
      to="/emergencia"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 animate-pulse"
      style={{
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className="h-6 w-6 mb-1" />
        <span className="text-xs font-bold">SOS</span>
      </div>
    </Link>
  )
} 
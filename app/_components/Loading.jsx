/** Loading Component  
 *  Description: This component displays a full-screen loading animation with a welcome message.
 */

'use client'

import { Loader2 } from 'lucide-react'

export default function Loading({
  className = ''
}) {
  return (
    /** Container - Centers content vertically & horizontally */
    <div className={`flex flex-col items-center justify-center min-h-screen bg-primary-blue ${className} fade-in`}>
      <div className="flex flex-col items-center space-y-4">
        <Loader2
          className="h-12 w-12 animate-spin text-light-blue"
          aria-label="Loading"
        />
        <p className="text-lg text-light-yellow text-5xl font-bold text-muted-foreground">
          Welcome to my portfolio!
        </p>
      </div>
    </div>
  );
};

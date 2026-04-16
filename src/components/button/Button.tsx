import React from 'react'

type ButtonProps = {
  children: React.ReactNode
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-4 py-2 bg-primary text-white rounded-xl">
      {children}
    </button>
  )
}
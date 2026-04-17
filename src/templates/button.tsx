import React from 'react';

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-primary rounded-xl px-4 py-2 text-white">
      {children}
    </button>
  );
};

import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-primary rounded-xl px-4 py-2 text-white">
      {children}
    </button>
  );
};

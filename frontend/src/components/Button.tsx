import React from 'react'

const Button = ({ onClick, children }: { onClick?: () => void; children : React.ReactNode }) => {
  return (
    <button onClick={onClick} className="bg-green-500 hover:bg-green-800 py-4 px-8 rounded text-white text-2xl font-bold">
      {children}
    </button>
  );
};

export default Button
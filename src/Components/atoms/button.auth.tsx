import React from 'react';

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, loading }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {loading ? 'Loading...' : text}
    </button>
  );
};

export { Button };

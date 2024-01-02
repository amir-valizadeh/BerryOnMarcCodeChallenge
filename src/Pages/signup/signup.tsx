import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, InputField } from '../../Components/atoms';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Update the API endpoint and request body as necessary for your sign-up process
      const response = await fetch(
        'https://65942a5a1493b011606a0c4d.mockapi.io/api/login', // Replace with your actual sign-up endpoint
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        // On successful sign-up, navigate to the login page
        navigate('/login');
      } else {
        // Handle errors, e.g., show an error message
        setError('Failed to sign up');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            id="username"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            id="password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button text="Sign Up" onClick={() => {}} loading={loading} />
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

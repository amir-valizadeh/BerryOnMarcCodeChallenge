import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, InputField } from '../../Components/atoms';
import { useUser } from '../../Hooks/userContext.tsx';
import { URL } from '../../Utils/base.ts';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
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
      const response = await fetch(URL + 'login');

      if (response.ok) {
        const data = await response.json();

        // Check if the username and password are correct
        const result = data.some(
          (data: { username: string; password: string }) => {
            return data.username === username && data.password === password;
          }
        );
        if (result) {
          const user = data.find(
            (data: { username: string; password: string }) => {
              return data.username === username && data.password === password;
            }
          );
          setUser(user);
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      }
    } catch (error) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h2>
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
          <Button
            text="Login"
            onClick={() => {
              console.log('clicked');
            }}
            loading={loading}
          />
        </form>
        <Link to="/signUp" className="mt-4 text-center">
          {`Don't have an account? Sign Up`}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

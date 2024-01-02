import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../Hooks/userContext.tsx';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user context
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div>
          <Link to="/" className="text-xl font-semibold">
            Berry On Marc
          </Link>
        </div>

        {/* User Info and Logout Button */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>{user.username}</span>
              <img
                src={user.avatar}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />{' '}
              {/* Assuming avatar is a URL */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signUp" className="hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

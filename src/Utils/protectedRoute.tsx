import { Navigate } from 'react-router-dom';
import { useUser } from '../Hooks/userContext.tsx'; // Import useUser from where it's defined

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useUser();

  if (!user) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" />;
  }

  return element;
};

export { ProtectedRoute };

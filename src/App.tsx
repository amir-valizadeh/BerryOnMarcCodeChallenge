import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './Utils';
import LoginForm from './Pages/login/login';
import SignupForm from './Pages/signup/signup';

import { UserProvider } from './Hooks/userContext.tsx';
import Navbar from './Pages/Navbar';
import Dashboard from './Pages/dashboard/index';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignupForm />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;

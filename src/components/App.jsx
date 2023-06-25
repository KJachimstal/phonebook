import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Phonebook from './pages/Phonebook';

export const App = props => {
  return (
    <Routes>
      <Route path="/" element={<Phonebook />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

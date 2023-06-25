import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Phonebook from './pages/Phonebook';
import Header from './pages/Header';
import NotFound from './pages/NotFound';

export const App = props => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Phonebook />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

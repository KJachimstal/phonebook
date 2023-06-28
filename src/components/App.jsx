import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Phonebook from './pages/Phonebook';
import Header from './pages/Header';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from 'redux/session';

export const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

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

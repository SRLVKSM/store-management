import { useState } from "react";
import axios from "axios";
import Header from '../Header';
import Body from "../Body";
import RegisterForm from "../RegisterForm";
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleRegistration = async (userData) => {
    try {
      // Replace the URL with the actual API endpoint for registration
      console.log(userData);
      const response = await axios.post('http://localhost:8000/api/users/register', userData);
      console.log(response.data); // You can do something with the response data
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      setIsRegisterModalOpen(false);
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const handleLogin = () => {
    // Your login logic here
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const onClose = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  }

  const openForm = formHandler => () => {
    formHandler(true);
  };

  return (
    <div className='app'>
      <Header />
      <Body
        isLoggedIn={isLoggedIn}
        onLogin={openForm(setIsLoginModalOpen)}
        onRegister={openForm(setIsRegisterModalOpen)}
      />
      <RegisterForm
        isOpen={isRegisterModalOpen || isLoginModalOpen}
        onRequestClose={onClose}
        onRegister={handleRegistration} // Replace this with your registration logic
        onLogin={handleLogin} // Replace this with your login logic
        isLogin={isLoginModalOpen}
      />
    </div>
  );
};

export default App;

import { useCallback, useEffect, useState } from "react";
import Header from '../Header';
import Body from "../Body";
import RegisterForm from "../RegisterForm";
import './App.css';
import { getUser, loginUser, registerUser } from '../actions';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = useCallback(() => {
    getUser(localStorage.getItem("jwt"))
      .then(({ data: { user } }) => {
        setUserInfo(user);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        doLogout();
        alert(`Unable to fetch user info: ${err?.response?.data?.message}`);
      })
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    setIsLoggedIn(true);
    getUserInfo();
  }, [getUserInfo]);

  const handleRegistration = (userData, apiToCall = registerUser) => {
    apiToCall(userData)
      .then(({ data }) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        onClose();
        getUserInfo();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  };

  const handleLogin = (userData) => {
    handleRegistration(userData, loginUser);
  };

  const onClose = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  }

  const openForm = formHandler => () => {
    formHandler(true);
  };

  const doLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <div className='app'>
      <Header userInfo={userInfo} isLoggedIn={isLoggedIn} doLogout={doLogout} />
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

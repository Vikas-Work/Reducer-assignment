import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ErrorModal from './components/UI/ErrorModal';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError({
        title: "Error",
        message: "Please enter a valid E-mail and password (non-empty values).",
      });
      return;
    }
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
    {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
    </React.Fragment>
  );
}

export default App;
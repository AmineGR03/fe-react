import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const handleLogin = (userData) => {

    history.push("/");
    

    alert(`Welcome ${userData.name} (ID: ${userData.id})`);
  };

  return (
    <LoginForm onLogin={handleLogin} />
  );
};

export default Login;

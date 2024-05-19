import { useState } from 'react';
import {apiPaths} from '../environment/apiPaths';

const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authenticate = async (email, password, endpoint) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(apiPaths[endpoint], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: email, pwd: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        endpoint === 'GET_LOGIN' ? window.location.href = "/chat" : window.location.href = "/login";
      } else {
        setError('Error al iniciar sesión, intenta nuevamente');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al realizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, authenticate };
};

export default useAuth;

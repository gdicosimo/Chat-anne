import { useState } from 'react';
import {apiPaths, endpointMethods} from '../environment/apiPaths';

const useFetch = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)
    const fetchdata = async (body, endpoint) => {
        setError(null);
        setLoading(true);
        console.log(body, apiPaths[endpoint], endpointMethods[endpoint])
        try {
        const response = await fetch(apiPaths[endpoint], {
            method: endpointMethods[endpoint],
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: body ? JSON.stringify(body) : null,
        });

        if (response.ok) {
            //const data = ;
            setData(await response.json());
            //console.log(data)
        } else {
            setError('Error al realizar la solicitud');
        }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al realizar la solicitud');
        } finally {
            setLoading(false);
        }
  };

  return { data, loading, error, fetchdata };
};

export default useFetch;

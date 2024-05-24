import { useState } from 'react';
import {apiPaths, endpointMethods} from '../environment/apiPaths';

const useFetch = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)
    const fetchdata = async (body, endpoint, queryParams, pdfs=false) => {
        setError(null);
        setLoading(true);
        console.log("USEFETCH:", body, apiPaths[endpoint], endpointMethods[endpoint], queryParams)
        let finalEndpoint = apiPaths[endpoint];
        if (queryParams){
            finalEndpoint = apiPaths[endpoint].concat("?id_chat=", queryParams)
        }
        //console.log(finalEndpoint)
        //console.log(body ? ( pdfs ? body : JSON.stringify(body)):null)
        try {
        const response = await fetch(finalEndpoint, {
            method: endpointMethods[endpoint],
            headers: {
            'Content-Type': pdfs ? 'multipart/form-data' : 'application/json',
            },
            credentials: 'include',
            body: body ? ( pdfs ? body : JSON.stringify(body)):null,
        });

        if (response.ok) {
            //const data = ;
            setData(await response.json());
            //console.log(data)
        } else {
            console.log(response)
            setError(response);
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

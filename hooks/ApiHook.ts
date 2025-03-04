import { useState, useEffect } from 'react';
import config from '@/settings'

const ApiHook  = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);





        const getData = async (url, token='') => {
            try {
                let response = await fetch(config.apiBaseUrl+url, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { 'Authorization': `Bearer ${token}` }),
                    },
                });
                let json = await response.json();
                setData(json);
                return json;
            } catch (e) {
               setError(e);
            } finally {
                setLoading(false);
            }
        };




    return {getData, data, loading, error };
};

export default ApiHook;

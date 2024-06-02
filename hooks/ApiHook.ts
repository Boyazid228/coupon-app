import { useState, useEffect } from 'react';
import config from '@/settings'

const ApiHook  = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(config.apiBaseUrl+url);
                let json = await response.json();
                setData(json);
            } catch (e) {
               setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default ApiHook;

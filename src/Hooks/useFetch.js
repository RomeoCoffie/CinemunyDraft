import { useState, useEffect } from 'react';

//we create the function in useEffect so we don't
//have to pass it as a dependency or usecallback to surround it
//is not always possible to not use usecallback

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null);
  const [ispending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText); //user error
        }
        const json = await res.json();
        setIsPending(false);
        setData(json);
        setError(null); // try was successful no need for error
      } catch (err) {
        setError('could not fetch data'); //throw user error
        setIsPending(false);
        console.log(err.message); //these only catch network error
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, ispending, error };
};

export default useFetch;

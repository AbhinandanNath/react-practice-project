/* eslint-disable no-unused-vars */


import {useEffect, useState, useRef } from "react";
export function useFetch(url) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [requestId, setRequestId] = useState(0);

    const isMounted = useRef(true);
  
    useEffect(() => {
      isMounted.current = true;
      const controller = new AbortController();
      const signal = controller.signal;
  
      const getData = async () => {
        setError(null);
        setIsLoading(true);
        // const currentRequestId = Date.now(); // Generate a unique ID for this request
        // setRequestId(currentRequestId);
        try {
          const response = await fetch(url, {signal });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
  
          if (isMounted.current) {
            setData(data);
            // if (currentRequestId === requestId) { // Only update state if this is the latest request
            //   setData(data);
            //   setIsLoading(false);
            // }
          }
        } catch (error) {
          if (isMounted.current) {
            setError(error.message);
          }
        } finally {
          if (isMounted.current) {
            setIsLoading(false);
          }
        }
      };
  
      getData();
  
      return () => {
        isMounted.current = false;
        controller.abort(); // Abort the fetch request if the component unmounts
      };
    }, [url,requestId]);
  
    return { isLoading, data, error };
  }
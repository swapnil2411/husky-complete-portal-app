import React from "react";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true; // Prevent setting state on unmounted component

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]); // re-fetch if URL changes

  return { data, loading, error };
};

export default useFetch;

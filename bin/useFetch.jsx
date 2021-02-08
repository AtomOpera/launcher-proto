import { useEffect, useState } from "react";

//fetch is fired from the index.html path (public folder)
//import uses the current file's path

// import data from './data2.json';

const useFetch = (inputFile) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!inputFile) inputFile = "data.json"; 
  // console.log(inputFile)

  useEffect(() => {
    const doFetch = async () => {
      setLoading(true);

      await fetch(inputFile)
        .then(res => res.json())
        .then(jsonData => setResponse(jsonData))
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    };
    doFetch();
  }, [inputFile]);

  return { response, error, loading };
};

export default useFetch;

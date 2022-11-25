import { useState } from "react";
import axios from "axios";

export const useFetch = (setIsLoading) => {
    const [data, setData] = useState();
    const [error, setError] = useState();

    const fetchData = (url) => {
      setIsLoading(true);
      axios.get(url)
        .then(data => setData(data.data))
        .catch(error => {
          setError(error);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };

    return { data, error, fetchData };
};
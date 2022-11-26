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

    const getMatch = (url, object1, object2) => {
      setIsLoading(true);
      axios.get(url + `/match?object_one=${object1}&object_two=${object2}`)
        .then(data => {
          setData(data.data);
          return data.data;
        })
        .catch(error => {
          setError(error);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };
    
    // const res = await axios({
    //   method: 'post',
    //   url: baseUrl,
    //   data: {
    //     content: inputValue,
    //     completed: false
    //   }
    // })
    return { data, error, fetchData, getMatch, setData };
};
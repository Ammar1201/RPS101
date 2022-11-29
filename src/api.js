import axios from 'axios';

const getMatchUrl = 'https://rps101.pythonanywhere.com/api/v1/';
const getObjectDetailsUrl = 'https://rps101.pythonanywhere.com/api/v1/objects/';

export const getMatchResultReq = (object1, object2, dispatch, setData, setIsLoading) => {
  setIsLoading(true);
  axios(getMatchUrl + `match?object_one=${object1}&object_two=${object2}`, {
    mode: 'no-cors',
    method: 'get',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(data => {
    dispatch({type: 'RESULT', payload: data.data});
    setData(data.data);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => setIsLoading(false));
};

export const getObjectDetailsReq = (objectName, setObject, setIsLoading) => {
  setIsLoading(true);
  axios(getObjectDetailsUrl + objectName , {
    mode: 'no-cors',
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(data => {
    setObject(data.data);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => setIsLoading(false));
};
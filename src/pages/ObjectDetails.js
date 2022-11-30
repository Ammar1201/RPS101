import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getObjectDetailsReq } from '../api';
import { objectsSrcName } from '../data';
import Card from '../components/utils/Card';
import classes from './ObjectDetails.module.css';

const ObjectDetails = ({setIsLoading}) => {
  const { objectName } = useParams();
  const [object, setObject] = useState({});

  const findObject = Object.keys(objectsSrcName).includes(objectName);

  useEffect(() => {
    if(findObject && objectName !== undefined && objectName !== null) {
      getObjectDetailsReq(objectName, setObject, setIsLoading);
    }
  }, [objectName, setIsLoading, findObject])

  return (
    <div>
      {!findObject && <Navigate to='/404' />}
      <div className={classes.title}>
        <h1>Winning Outcomes Of Object <span style={{color: 'blue'}}>{objectName}</span></h1>
      </div>
      <div className={classes.container}>
        {object&&object['winning outcomes'] && object['winning outcomes'].map(outcome => {  
          return (<div className={classes.card} key={outcome[1]}>
            <Card object={objectsSrcName[objectName]} />
            <h1>{outcome[0]}</h1>
            <Card object={objectsSrcName[outcome[1]]} />
          </div>)
        })}
      </div>
    </div>
  )
}

export default ObjectDetails;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getObjectDetailsReq } from '../api';
import { objectsSrcName } from '../data';
import Card from '../components/utils/Card';
import classes from './ObjectDetails.module.css';

const ObjectDetails = ({setIsLoading}) => {
  const { objectName } = useParams();
  const [object, setObject] = useState({});

  useEffect(() => {
    getObjectDetailsReq(objectName, setObject, setIsLoading);
  }, [objectName, setIsLoading])

  //TODO: when clicking outside an object card objectName === null, should fix it.

  return (
    <div>
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
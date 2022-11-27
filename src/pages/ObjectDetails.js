// import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { objectsSrcName } from '../data';
import Card from '../components/utils/Card';
import classes from './ObjectDetails.module.css';

const ObjectDetails = ({setIsLoading}) => {
  const { objectName } = useParams();
  // const [object, setObject] = useState({});

  const object = {
    object: "nuke",
    winningOutcomes: [
        [
            "poisons",
            "Sky"
        ],
        [
            "incinerates",
            "Tank"
        ],
        [
            "incinerates",
            "Helicopter"
        ],
        [
            "outclasses",
            "Dynamite"
        ],
        [
            "outclasses",
            "Tornado"
        ],
        [
            "incinerates",
            "Quicksand"
        ],
        [
            "emerges from",
            "Pit"
        ],
        [
            "starts reaction",
            "Chain"
        ],
        [
            "outclasses",
            "Gun"
        ],
        [
            "breaks",
            "Law"
        ],
        [
            "incinerates",
            "Whip"
        ],
        [
            "incinerates",
            "Sword"
        ],
        [
            "incinerates",
            "Rock"
        ],
        [
            "causes",
            "Death"
        ],
        [
            "incinerates",
            "Wall"
        ],
        [
            "has power of",
            "Sun"
        ],
        [
            "incinerates",
            "Camera"
        ],
        [
            "starts",
            "Fire"
        ],
        [
            "incinerates",
            "Chainsaw"
        ],
        [
            "incinerates",
            "School"
        ],
        [
            "incinerates",
            "Scissors"
        ],
        [
            "incinerates",
            "Poison"
        ],
        [
            "incinerates",
            "Cage"
        ],
        [
            "incinerates",
            "Axe"
        ],
        [
            "breaks",
            "Peace"
        ],
        [
            "incinerates",
            "Computer"
        ],
        [
            "incinerates",
            "Castle"
        ],
        [
            "incinerates",
            "Snake"
        ],
        [
            "incinerates",
            "Blood"
        ],
        [
            "incinerates",
            "Porcupine"
        ],
        [
            "incinerates",
            "Vulture"
        ],
        [
            "incinerates",
            "Monkey"
        ],
        [
            "incinerates",
            "King"
        ],
        [
            "incinerates",
            "Queen"
        ],
        [
            "incinerates",
            "Prince"
        ],
        [
            "incinerates",
            "Princess"
        ],
        [
            "incinerates",
            "Police"
        ],
        [
            "incinerates",
            "Woman"
        ],
        [
            "incinerates",
            "Baby"
        ],
        [
            "incinerates",
            "Man"
        ],
        [
            "incinerates",
            "Home"
        ],
        [
            "incinerates",
            "Train"
        ],
        [
            "incinerates",
            "Car"
        ],
        [
            "makes",
            "Noise"
        ],
        [
            "incinerates",
            "Bicycle"
        ],
        [
            "incinerates",
            "Tree"
        ],
        [
            "incinerates",
            "Turnip"
        ],
        [
            "incinerates",
            "Duck"
        ],
        [
            "incinerates",
            "Wolf"
        ],
        [
            "incinerates",
            "Cat"
        ]
    ]
}

  // useEffect(() => {
  //   const getObjectDetails = (url) => {
  //     setIsLoading(true);
  //     axios(url , {
  //       mode: 'no-cors',
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //     })
  //       .then(data => {
  //         setObject(data.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //       .finally(() => setIsLoading(false));
  //   };
  //   getObjectDetails(`https://rps101.pythonanywhere.com/api/v1/objects/${objectName}`);
  // }, [objectName, setIsLoading])

  return (
    <div>
      <div className={classes.title}>
        <h1>Winning Outcomes Of Object <span style={{color: 'blue'}}>{objectName}</span></h1>
      </div>
      <div className={classes.container}>
        {console.log(object)}
        {object && object.winningOutcomes.map(outcome => {
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
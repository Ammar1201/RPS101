import React from 'react';
import classes from './Card.module.css';

const Card = ({object}) => {
  return (
    <div id={object.name} key={object.name} className={classes.card}>
      <img id={object.name} src={object.src} alt={object.name} />
      <h4 id={object.name}>{object.name}</h4>
    </div>
  )
}

export default Card;
import { Link } from 'react-router-dom';
import classes from './Play.module.css';

const Play = () => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>
            <h2>
              Choose Mode
            </h2>
          </div>
        </div>
        <div className={classes.content}>
            <div>
              <Link to='/play/player-vs-player' ><img src='../assets/imgs/player-vs-player.png' alt="player-vs-player" /></Link>
            </div>
            <div>
              <h3>OR</h3>
            </div>
            <div>
              <Link to='/play/player-vs-ai' ><img src='../assets/imgs/player-vs-ai.png' alt="player-vs-AI" /></Link>
            </div>
        </div>
        <div className={classes.freeMode}>
          <Link to='/play/freeMode' >Free Mode</Link>
        </div>
      </div>
    </div> 
  );
}
 
export default Play;
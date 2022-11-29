import { Link } from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => {
  return ( 
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>
            <h1>
              Welcome To RPS - 101 
            </h1>
            <h2>
              RPS - Rock, Papers, Scissors With 101 Objects
            </h2>
          </div>
        </div>
        <div className={classes.content}>
            <Link to='/play' >Play</Link>
            <Link to='/scoreboard' >Score Board</Link>
            <Link to='/wiki' >Wiki</Link>
        </div>
      </div>
    </div> 
  );
}
 
export default Home;
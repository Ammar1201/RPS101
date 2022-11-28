import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from '../firebase';
import classes from './ScoreBoard.module.css';

const ScoreBoard = ({setIsLoading}) => {
  const [users, setUsers] = useState([]);
  const MAX_TOP_PLAYERS = 5;

  useEffect(() => {
    const readUserData = () => {
      setIsLoading(true);
      onValue(ref(db, 'users/'), (snapshot) => {
        const data = snapshot.val();
        sortUsers(data);
      });
      setIsLoading(false);
    };
    readUserData();
  }, [setIsLoading]);

  const sortUsers = (scores) => {
    const tmp = Object.values(scores).sort((a, b) => {
      if (a.points > b.points) return 1;
      if (a.points < b.points) return -1;
      return 0;
    });

    if(tmp.length  > MAX_TOP_PLAYERS) {
      setUsers(tmp.reverse().slice(0, MAX_TOP_PLAYERS));
      return;
    }
    setUsers(tmp.reverse());
  };

  return ( 
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Top 5 Players</h1>
      </div>
      <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>No.</span>
          <span>UserName</span>
          <span>Points</span>
          <span>Rank</span>
        </div>
        {users.map((user, index) => {
          return <div className={classes.row} key={user.username}>
            <span>{index + 1}</span>
            <span>{user.username}</span>
            <span>{user.points}</span>
            <span>{user.rank}</span>
          </div>
        })}
      </div>
    </div> 
  );
}
 
export default ScoreBoard;
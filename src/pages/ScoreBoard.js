import { useEffect, useState } from "react";
import { readUserData } from '../firebase';
import classes from './ScoreBoard.module.css';

const ScoreBoard = () => {
  const [users, setUsers] = useState([]);
  const MAX_TOP_PLAYERS = 5; // amount of players to show on the scoreboard.

  useEffect(() => {
    readUserData(sortUsers);
  }, []);

  const sortUsers = (scores) => {
    const sortedUsersByScores = Object.values(scores).sort((a, b) => {
      if (a.points > b.points) return 1;
      if (a.points < b.points) return -1;
      return 0;
    });

    if(sortedUsersByScores.length  > MAX_TOP_PLAYERS) {
      setUsers(sortedUsersByScores.reverse().slice(0, MAX_TOP_PLAYERS));
      return;
    }
    setUsers(sortedUsersByScores.reverse());
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Top Players</h1>
      </div>
      <div className={classes.table}>
        <div className={classes.tableHeader}>
          <span>No.</span>
          <span>Username</span>
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
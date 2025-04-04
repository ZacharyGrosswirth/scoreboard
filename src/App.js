import React, { useEffect, useState } from "react";
import "./App.css";
import GatorsLogo from "./gators.png";
import TigersLogo from "./auburn.png";

const App = () => {
  const [leftTeamScore, setLeftTeamScore] = useState(0);
  const [rightTeamScore, setRightTeamScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("20:00");  
  const [half, setHalf] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard")
        .then((res) => res.json())
        .then((data) => {
          const leftTeamScore = data.events[0].competitions[0].competitors[0].score;
          const rightTeamScore = data.events[0].competitions[0].competitors[1].score;
          const timeRemaining = data.events[0].competitions[0].status.displayClock;
          const half = data.events[0].competitions[0].status.period;
          setLeftTeamScore(leftTeamScore);
          setRightTeamScore(rightTeamScore);
          setTimeRemaining(timeRemaining);
          setHalf(half);
        })
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const leftTeam = {
    name: "FLORIDA GATORS",
    record: "34 - 4",
    score: 0,
    logo: GatorsLogo,
  };

  const rightTeam = {
    name: "AUBURN TIGERS",
    record: "32 - 5",
    score: 0,
    logo: TigersLogo,
  };

  return (
    <div className="scoreboard-container">
      <div className="team left-team">
        <div className="team-info">
          <img
            src={leftTeam.logo}
            alt={`${leftTeam.name} logo`}
            className="team-logo left-logo"
          />
          <div className="team-name">{leftTeam.name}</div>
          <div className="team-record">{leftTeam.record}</div>
        </div>
        <div className="team-score">{leftTeamScore}</div>
      </div>

      <div className="team right-team">
        <div className="team-info">
          <img
            src={rightTeam.logo}
            alt={`${rightTeam.name} logo`}
            className="team-logo right-logo"
          />
          <div className="team-name">{rightTeam.name}</div>
          <div className="team-record">{rightTeam.record}</div>
        </div>
        <div className="team-score">{rightTeamScore}</div>
      </div>

      <div className="game-status-container">
        <div className="game-time">{timeRemaining}</div>
        <div className="game-detail">
          <div>{half === 1 || half === 0 ? "1st Half" : "2nd Half"}</div>
        </div>
      </div>
    </div>
  );
};

export default App;

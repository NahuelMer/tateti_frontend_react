import logo from './logo.svg';
import './App.css';
// import { HooksPlayers } from './players';
// import { HookBoard } from './board'
import React, { useState, useEffect } from "react"

function App() {

  const [playersComponent, setPlayersComponent] = useState(true);
  const [showButton, setShowButton] = useState(true);

  let showPlayersComponent = () => {
    setPlayersComponent(!playersComponent)
    setShowButton(!showButton)
  }


  return (
    <div className="App">
      <header className="App-header">

      <h1>Ta te ti</h1>
        <div>
        {/* {playersComponent ? <HooksPlayers /> : <HookBoard />} */}
        <br />
        {showButton ? <input type="submit" id="playButton" name="sub1" value="Jugar" onClick={showPlayersComponent}></input> : null}
        </div>
      </header>

    </div>
  );
}

export default App;

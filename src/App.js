import React from "react";
import logo from "./images/othello-logo.jpg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Board from "./Components/Board.js";

function App() {
  return (
    <div className="App">
      <header>
        <img width="70%" height="360px" src={logo} alt="othello" />
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;

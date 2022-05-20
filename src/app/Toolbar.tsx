import React from "react"
import "./Toolbar.css"
import { useSessionPlayer } from "../store/playerStore"

export default function Toolbar() {
  const player = useSessionPlayer()

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex shadow">
      <div className="toolbar_icon">
        <img src="/assets/favicon.png" alt=""></img>
      </div>

      <div className="toolbar_title navbar-brand flex-grow-1">
        Tic-tac-toe {player ? " - " + player.player_name : ""}
      </div>

    </nav>
  )
}

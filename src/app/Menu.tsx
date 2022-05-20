import React from "react"
import LoginMenu from "./LoginMenu"
import MainMenu from "./MainMenu"
import "./Menu.css"
import { useSessionPlayer } from "../store/playerStore"

export default function Menu() {
  const player = useSessionPlayer()

  const menu = player ? <MainMenu /> : <LoginMenu />

  return (
    <div className="menu_div navbar-nav bg-light shadow">
      {menu}
    </div>
  )
}

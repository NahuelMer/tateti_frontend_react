import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"
import { logout } from "../player/playerService"

export default function MainMenu() {
  const logoutApp = () => {
    void logout()
  }

  return (
    <div>
      <NavLink to="/info" className="menu_item btn btn-sm btn-link">Sesión</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />

      <h6 className="menu_section">Perfil</h6>
    </div>
  )
}
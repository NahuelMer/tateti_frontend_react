import React from "react"
import {
  BrowserRouter, Outlet, Route, Routes
} from "react-router-dom"
import { StateLoggedInRoute } from "../common/components/LoggedInRoute"
import Login from "../player/Login"
import Register from "../player/Register"
import Welcome from "../welcome/Welcome"
import "./App.css"
import Menu from "./Menu"
import Toolbar from "./Toolbar"

export default function App() {

  return (
    <BrowserRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/newplayer" element={<Register />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet />
    </BrowserRouter >
  );
}

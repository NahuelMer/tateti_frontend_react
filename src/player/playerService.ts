import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionPlayer, updateSessionPlayer } from "../store/playerStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Token {
  token: string
}

export async function login(params: {
  player_name: string
  password: string
}): Promise<Player> {
  const res = (
    await axios.post(environment.backendUrl + "/v1/players/login", params)
  ).data.player as Player

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  // void reloadCurrentPlayer().then()
  return res
}

// Valores almacenados en LOCAL STORE
function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = "Bearer " + token
}

function getCurrentPlayer(): Player | undefined {
  return localStorage.getItem("player") as unknown as Player
}

export async function logout(): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("player")
  
  axios.defaults.headers.common.Authorization = ""
  cleanupSessionToken()
  cleanupSessionPlayer()

  // try {
  //   await axios.get(environment.backendUrl + "/v1/player/signout")
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   axios.defaults.headers.common.Authorization = ""
  //   return
  // } catch (err) {
  //   return
  // } finally {
  //   cleanupSessionToken()
  //   cleanupSessionPlayer()
  // }
}

export interface Player {
    id: string
    player_name: string
    token: string
}

// ???????????????????????????????
// export async function reloadCurrentPlayer(): Promise<Player> {
//   try {
//     const res = (await axios.get(environment.backendUrl + "/v1/players/current"))
//       .data as Player
//     localStorage.setItem("player", JSON.stringify(res))
//     updateSessionPlayer(res)
//     return res
//   } catch (err) {
//     const axiosError = err as AxiosError
//     if (axiosError.response && axiosError.response.status === 401) {
//       void logout()
//     }
//     throw err
//   }
// }

export async function newPlayer(params: {
  player_name: string
  password: string
}): Promise<Player> {
  const res = (await axios.post(environment.backendUrl + "/v1/players", params)
  ).data.player as Player

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  // void reloadCurrentPlayer().then()
  return res
}

if (getCurrentToken()) {
  const currentPlayer = getCurrentPlayer()
  const currentToken = getCurrentToken()
  if (currentPlayer !== undefined && currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = "Bearer " + currentToken
    updateSessionToken(currentToken)
    updateSessionPlayer(currentPlayer)
    // void reloadCurrentPlayer().then()
  }
}

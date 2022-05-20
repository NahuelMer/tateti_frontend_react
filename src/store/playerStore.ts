import { Subject } from "rxjs"
import { Player } from "../player/playerService"
import { useState, useLayoutEffect } from "react"

let currentPlayer: Player | undefined

const playerSubject = new Subject<Player | undefined>()

export function useSessionPlayer() {
  const [player, setPlayer] = useState(currentPlayer)

  useLayoutEffect(() => {
    playerSubject.subscribe((newState) => {
      setPlayer(newState)
    })
  }, [])

  return player
}

export function updateSessionPlayer(player: Player) {
  currentPlayer = player
  playerSubject.next(currentPlayer)
}

export function cleanupSessionPlayer() {
  currentPlayer = undefined
  playerSubject.next(currentPlayer)
}

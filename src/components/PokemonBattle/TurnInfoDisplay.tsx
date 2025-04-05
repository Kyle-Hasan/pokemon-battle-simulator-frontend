import React from 'react'
import { BattleTurnEvent } from '../../types/BattleTurnEvent'

interface TurnInfoDisplayProps {
    event:BattleTurnEvent
}

export default function TurnInfoDisplay( {event}: TurnInfoDisplayProps) {
  return (
    <div> {event.message} </div>
  )
}

import React from 'react'
import { BattleTurnEvent } from '../../types/BattleTurnEvent'

interface PokemonBattleBattleFieldProps {
  events:BattleTurnEvent[]
}

export default function PokemonBattleTurnInfo({event}:PokemonBattleBattleFieldProps) {



  return (
    <div className='border p-8'>PokemonBattleTurnInfo</div>
  )
}

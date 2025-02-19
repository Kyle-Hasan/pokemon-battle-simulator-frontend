import React from 'react'
import PokemonBattleBattleField from './PokemonBattleBattleField'
import PokemonBattleTurnInfo from './PokemonBattleTurnInfo'

export default function PokemonBattleView() {
  return (
    <div className='w-full flex justify-center align-center mt-32'><PokemonBattleBattleField/><PokemonBattleTurnInfo/></div>
  )
}

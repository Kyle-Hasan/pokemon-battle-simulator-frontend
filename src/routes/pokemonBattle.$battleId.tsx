import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import PokemonBattleView from '../components/PokemonBattle/PokemonBattleView'

export const Route = createFileRoute('/pokemonBattle/$battleId')({
  component: PokemonBattle,
})


export default function PokemonBattle() {
  return (
    <div className='w-full h-screen'>
   <PokemonBattleView/>
   </div>
  )
}

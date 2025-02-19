import React from 'react'
import { Pokemon } from '../types/Pokemon'
import { BottomState, usePokemonEditStoreInContext } from '../Context/PokemonEditContext';
import StatBar from './StatBar';




export default function ViewStats() {

  const pokemonSpecies = usePokemonEditStoreInContext((state) => state.pokemonSpecies);

  const setBottomState = usePokemonEditStoreInContext((state)=> state.setBottomState)


  

  return (
    <div className='flex flex-col gap-2 border p-8 w-48 bg-gray-800 hover:bg-gray-500 hover:cursor-pointer' onClick={()=> {setBottomState(BottomState.STATS)}}>
      <h1>Stats</h1>
     <StatBar small={true} name={"HP"} value={pokemonSpecies?.baseStats.hp ?? 0}></StatBar>
     <StatBar small={true} name={"Atk"} value={pokemonSpecies?.baseStats.attack ?? 0}></StatBar>
     <StatBar small={true} name={"Def"} value={pokemonSpecies?.baseStats.defense ?? 0}></StatBar>
     <StatBar small={true} name={"SpA"} value={pokemonSpecies?.baseStats.specialAttack ?? 0}></StatBar>
     <StatBar small={true} name={"SpD"} value={pokemonSpecies?.baseStats.specialDefense ?? 0}></StatBar>
     <StatBar small={true} name={"Spe"} value={pokemonSpecies?.baseStats.speed?? 0}></StatBar>

      
    </div>
  )
}

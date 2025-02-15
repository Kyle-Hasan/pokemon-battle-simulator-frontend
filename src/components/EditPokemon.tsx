import React, { useState } from 'react'
import { Pokemon } from '../types/Pokemon'
import PokemonForm from './PokemonForm'
import EditPokemonBottom from './EditPokemonBottom'
import MovesEditor from './MovesEditor'
import EditStats from './EditStats'
import { PokemonEditContextProvider, usePokemonEditStoreInContext } from './Context/PokemonEditContext'


interface EditPokemonProps {
    pokemon:Pokemon,
    teamId:string
}

export default function EditPokemon({pokemon,teamId}:EditPokemonProps) {


  const setMoves = usePokemonEditStoreInContext((state)=>state.setMoves)
  const setAbility = usePokemonEditStoreInContext((state)=>state.setAbility)
  const setPokemonId = usePokemonEditStoreInContext((state)=>state.setPokemonId)
  const setPokemonSpecies = usePokemonEditStoreInContext((state)=>state.setPokemonSpecies)
  const setTeamId = usePokemonEditStoreInContext((state)=>state.setTeamId)
  
  setTeamId(teamId)
  if (pokemon.pokemonSpecies) {
    setPokemonSpecies(pokemon.pokemonSpecies)
  }
  if (pokemon._id) {
    setPokemonId(pokemon._id)
  }
 setMoves(pokemon.moves)

  

   
  return (
    
    <div>
    <div className='flex gap-16'>
  
    <PokemonForm  pokemon={pokemon}></PokemonForm>
    <MovesEditor></MovesEditor>
    <EditStats pokemon={pokemon}></EditStats>
    </div>
    <div>
      <EditPokemonBottom></EditPokemonBottom>
    </div>

    </div>
     
  )
}

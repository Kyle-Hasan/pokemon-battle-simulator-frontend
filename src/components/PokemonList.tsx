import React from 'react'
import { Pokemon } from '../types/Pokemon'
import { gql, useQuery } from '@apollo/client';
import { PokemonSpecies } from '../types/PokemonSpecies';
import PokemonTable from './PokemonTable';


const GET_POKEMON = gql`
  query {
  allPokemon {
    _id
    name
    teamBuilderSprite
    abilities{
        name
    }
    type
    baseStats{
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
    }
  }
}
`;


interface PokemonListProps {
    onPokemonChange: (pokemon: PokemonSpecies) => void;
  }


interface AllPokemon {
   allPokemon:PokemonSpecies[]
}


  

export default function PokemonList({onPokemonChange}:PokemonListProps) {

  const {data,loading,error} = useQuery<AllPokemon>(GET_POKEMON)

  if(loading) {
    return (
      <div>Loading</div>
    )
  }
  return (
    <div className="flex flex-col">
    <PokemonTable pokemon={data ? data.allPokemon : []} onPokemonChange={onPokemonChange}></PokemonTable>
    </div>
  )
}

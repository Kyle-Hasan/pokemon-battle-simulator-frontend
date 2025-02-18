import React from "react";
import { Pokemon } from "../types/Pokemon";
import { Button } from "./ui/button";

interface PokemonBarProps {
  pokemon: Pokemon[];
  setSelectedPokemon: (pokemon:Pokemon | null)=> void;
  setAddingMode: (adding: boolean) => void;
  selectedPokemon:Pokemon | null
}

export default function PokemonBar({
  pokemon,
  setAddingMode,
  selectedPokemon,
  setSelectedPokemon
}: PokemonBarProps) {

  
  return (
    <div className="flex gap-3">
      
      {
        pokemon.map(x=> <div className={`hover:cursor-pointer w-32 h-32 border p-8 ${selectedPokemon?._id === x._id && "bg-gray-400"}`} onClick={()=> {
          setSelectedPokemon(x)
          setAddingMode(false)
          }} >
           <img
                src={x.pokemonSpecies?.teamBuilderSprite}
                alt={x.pokemonSpecies?.name || "Pokémon"}
                className="w-12 h-12"
              />
          <p className="text-white">{x.pokemonSpecies?.name}</p>
          </div>)
      }
     

      <Button
        className={` ml-2 ${pokemon.length > 0 ? 'my-auto' : 'my-6'}`}
        onClick={() => {
          setSelectedPokemon(null)
          setAddingMode(true);
        }}
      >
        Add Pokemon
      </Button>
    </div>
  );
}

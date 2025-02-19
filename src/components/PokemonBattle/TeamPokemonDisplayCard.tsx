import React from "react";
import { PokemonInBattle } from "../../types/PokemonInBattle";

interface TeamPokemonDisplayCardProps {
  pokemon: PokemonInBattle;
}

export default function TeamPokemonDisplayCard({
  pokemon,
}: TeamPokemonDisplayCardProps) {
  return (
    <div className="flex gap-2 p-4 bg-gray-500 hover:cursor-pointer border mt-4 w-32">
    <img src={pokemon.pokemonSpecies?.teamBuilderSprite}></img>
      <div>
        <div>{pokemon.pokemonSpecies?.name}</div>
        <div className="w-full bg-gray-200">
         <div
        className={`h-4 bg-green-200`}
        style={{ width: `${pokemon.remainingHealth/pokemon.maxHealth}%` }}
      ></div>
        </div>
        </div>
     
    </div>
  );
}

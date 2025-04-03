import React from "react";
import PokemonStatusBars from "./PokemonStatusBars";
import PokemonSprite from "./PokemonSprite";
import { PokemonInBattle } from "../../types/PokemonInBattle";

interface ActivePokemonProps {
  activePokemon: PokemonInBattle | null;
  player:boolean
}

export default function ActivePokemon({ activePokemon,player }: ActivePokemonProps) {
  if (!activePokemon) return null;
  return (
    <div className={player ? 'self-end' : ''}>
      <PokemonStatusBars
        name={activePokemon.pokemon.pokemonSpecies?.name ?? ""}
        level={activePokemon.pokemon.level}
        status={activePokemon.status}
        percentHealth={
          (activePokemon.remainingHealth / activePokemon.pokemon.stats.hp) * 100
        }
      />
      <PokemonSprite
        pokemonSpriteLink={ player ?  activePokemon.pokemon?.pokemonSpecies?.battleBackSprite ?? "" : activePokemon.pokemon?.pokemonSpecies?.battleFrontSprite ?? ""}
      />
    </div>
  );
}

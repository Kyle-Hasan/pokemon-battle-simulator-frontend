// ActivePokemon.tsx
import React, { useEffect, forwardRef } from "react";
import PokemonStatusBars from "./PokemonStatusBars";
import PokemonSprite from "./PokemonSprite";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import { BattleTurnEvent } from "../../types/BattleTurnEvent";

interface ActivePokemonProps {
  activePokemon: PokemonInBattle | null;
  player: boolean;
  activeEvent: BattleTurnEvent | null;
}

const ActivePokemon = forwardRef<HTMLImageElement, ActivePokemonProps>(
  ({ activePokemon, player, activeEvent }, ref) => {
    useEffect(() => {}, [activeEvent]);

    if (!activePokemon) return null;

    return (
      <div className={player ? "self-end" : ""}>
        <PokemonStatusBars
          name={activePokemon.pokemon.pokemonSpecies?.name ?? ""}
          level={activePokemon.pokemon.level}
          status={activePokemon.status}
          percentHealth={
            (activePokemon.remainingHealth /
              activePokemon.pokemon.stats.hp) *
            100
          }
        />
        <PokemonSprite
          ref={ref}
          pokemonSpriteLink={
            player
              ? activePokemon.pokemon?.pokemonSpecies?.battleBackSprite ?? ""
              : activePokemon.pokemon?.pokemonSpecies?.battleFrontSprite ?? ""
          }
        />
      </div>
    );
  }
);

export default ActivePokemon;

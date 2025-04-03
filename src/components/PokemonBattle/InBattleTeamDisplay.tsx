import React from "react";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import TeamPokemonDisplayCard from "./TeamPokemonDisplayCard";

interface InBattleTeamDisplayProps {
  team: PokemonInBattle[];
}

export default function InBattleTeamDisplay({
  team,
}: InBattleTeamDisplayProps) {
  return (
    <div className="flex gap-2">
      {team.map((pokemon) => (
        <TeamPokemonDisplayCard key={pokemon.pokemon._id} pokemon={pokemon} />
      ))}
    </div>
  );
}

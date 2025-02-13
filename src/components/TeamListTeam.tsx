import React from "react";
import { Team } from "../types/Team";

interface TeamListTeamProps {
  team: Team;
}

export default function TeamListTeam({ team }: TeamListTeamProps) {
  return (
    <div className="border bg-gray-400 rounded-xl p-4 shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer  max-w-xs mx-auto">
      <h3 className="text-lg font-semibold text-center">{team.name}</h3>
      <div className="flex justify-center gap-4 mt-3">
        {team.pokemon?.map((x, index) => (
          <img
            key={index}
            src={x.pokemonSpecies?.teamBuilderSprite}
            alt={x.pokemonSpecies?.name || "Pokémon"}
            className="w-12 h-12 object-contain transition-transform transform hover:scale-110"
          />
        ))}
      </div>
    </div>
  );
}

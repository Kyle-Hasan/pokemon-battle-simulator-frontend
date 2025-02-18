import React from "react";
import { Team } from "../types/Team";
import { useRouter } from "@tanstack/react-router";
import { gql, useMutation } from "@apollo/client";
import { Button } from "./ui/button";

interface TeamListTeamProps {
  team: Team;
  deleteTeamRequest: (teamId: string) => void;
}

export default function TeamListTeam({
  team,
  deleteTeamRequest,
}: TeamListTeamProps) {
  const router = useRouter();

  const navigateToTeam = () => {
    router.navigate({ href: `/team/${team._id}` });
  };

  return (
    <div className="border bg-gray-400 rounded-xl w-[20%]  p-4 shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer   mx-auto">
      <div
        onClick={() => {
          navigateToTeam();
        }}
        className=""
      >
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
      
      <Button
        className="block mx-auto mt-2"
        onClick={() => {
          deleteTeamRequest(team._id as string);
        }}
      >
        Delete Team
      </Button>
    
    </div>
  );
}

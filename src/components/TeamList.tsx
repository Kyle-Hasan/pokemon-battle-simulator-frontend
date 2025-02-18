import React from "react";
import { Team } from "../types/Team";
import TeamListTeam from "./TeamListTeam";
import { gql, useMutation } from "@apollo/client";

interface TeamListProps {
  teams: Team[];
  deleteTeamRequest:(teamId:string)=>void
}




export default function TeamList({ teams,deleteTeamRequest }: TeamListProps) {

  
  
  return (
    <div className="flex-col gap-2">
      {teams.map((x) => (
        <TeamListTeam deleteTeamRequest={deleteTeamRequest} team={x}></TeamListTeam>
      ))}
    </div>
  );
}

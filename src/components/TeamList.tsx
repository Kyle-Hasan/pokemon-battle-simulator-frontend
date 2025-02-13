import React from "react";
import { Team } from "../types/Team";
import TeamListTeam from "./TeamListTeam";

interface TeamListProps {
  teams: Team[];
}
export default function TeamList({ teams }: TeamListProps) {
  return (
    <div className="border p-2 flex flex-col gap-2">
      {teams.map((x) => (
        <TeamListTeam team={x}></TeamListTeam>
      ))}
    </div>
  );
}

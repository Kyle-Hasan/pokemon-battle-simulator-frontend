import React from "react";
interface pokemonStatusBarProps {
  name: string;
  percentHealth: number;
  level: number;
  status: string;
}
export default function PokemonStatusBars({
  name,
  percentHealth,
  level,
  status,
}: pokemonStatusBarProps) {
  return (
    <div>
      <div className="flex gap-1 text-black">
        <h2 className=" font-bold ">{name}</h2>
        <span>L{level}</span>
      </div>
      <div className="flex w-48 rounded-md bg-gray-500">
        <div className="w-[85%] bg-green-100 h-4 rounded-md">
          <div className={` bg-green-500 h-4 rounded-md  `} style={{width:`${percentHealth}%`}}></div>
        </div>
        <div className=" px-1 h-4 text-xs rounded-md">{percentHealth}%</div>
      </div>
      <div>{status}</div>
    </div>
  );
}

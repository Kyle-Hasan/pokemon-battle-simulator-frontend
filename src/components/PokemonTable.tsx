import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Pokemon } from "../types/Pokemon";
import { PokemonSpecies } from "../types/PokemonSpecies";

interface PokemonTableProps {
  pokemon: PokemonSpecies[];
  onPokemonChange: (pokemon: PokemonSpecies) => void;
}

export default function PokemonTable({
  pokemon,
  onPokemonChange,
}: PokemonTableProps) {
  return (
    <Table className="max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>Abilities</TableHead>
          <TableHead>HP</TableHead>
          <TableHead>Atk</TableHead>
          <TableHead>Def</TableHead>
          <TableHead>SpA</TableHead>
          <TableHead>SpD</TableHead>
          <TableHead>Spe</TableHead>
          <TableHead>BST</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemon.map((x) => (
          <TableRow className="hover:cursor-pointer" onClick={()=> {onPokemonChange(x)}}>
            <TableCell>
              <img
                src={x.teamBuilderSprite}
                alt={x.name || "Pokémon"}
                className="w-12 h-12"
              />
            </TableCell>
            <TableCell>{x.name}</TableCell>
            <TableCell>{x.type}</TableCell>
            <TableCell>{x.abilities?.map((x) => x.name)}</TableCell>
            <TableCell>{x.baseStats.hp}</TableCell>
            <TableCell>{x.baseStats.attack}</TableCell>
            <TableCell>{x.baseStats.defense}</TableCell>
            <TableCell>{x.baseStats.specialAttack}</TableCell>
            <TableCell>{x.baseStats.specialDefense}</TableCell>
            <TableCell>{x.baseStats.speed}</TableCell>
            <TableCell>
              {x.baseStats.hp +
                x.baseStats.attack +
                x.baseStats.defense +
                x.baseStats.specialDefense +
                x.baseStats.specialAttack +
                x.baseStats.speed}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

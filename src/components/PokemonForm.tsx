import React, { useState } from "react";
import { Pokemon } from "../types/Pokemon";

import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface PokemonFormProps {
  pokemon: Pokemon;
}

export default function PokemonForm({
  pokemon,
 
}: PokemonFormProps) {
  const [level, setLevel] = useState(100);
  const [nickname, setNickname] = useState("");
  const [ability, setAbility] = useState("");
  const [item, setItem] = useState("");
  return (
    <div>
      <div className="flex gap-16">
        <img
          src={pokemon.pokemonSpecies?.teamBuilderSprite}
          alt={pokemon.pokemonSpecies?.name || "Pokémon"}
          className="w-36 h-26 object-contain transition-transform transform hover:scale-110"
        />
        <div className="space-y-4">
          <div className="mb-2">
            <div className="grid gap-1">
              <Input value={pokemon.pokemonSpecies?.name} disabled />

              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                type="number"
                placeholder="level"
                value={level}
                onChange={(e) => setLevel(+e.target.value)}
                min="1"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="item">Item</Label>
              <Input
                id="item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ability">Ability</Label>
              <Input
                id="ability"
                value={ability}
                onChange={(e) => setAbility(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p className="text-white">{pokemon.pokemonSpecies?.type?.map((x) => x)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

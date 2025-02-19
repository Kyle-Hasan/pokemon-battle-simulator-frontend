import React, { useState } from "react";
import { Pokemon } from "../types/Pokemon";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { BottomState, usePokemonEditStoreInContext } from "../Context/PokemonEditContext";



export default function PokemonForm() {
  const [level, setLevel] = useState(100);
  const [item, setItem] = useState("");
  const setSearchText = usePokemonEditStoreInContext((state)=>state.setSearchText)
  const pokemonSpecies = usePokemonEditStoreInContext((state)=>state.pokemonSpecies)
  const setBottomState = usePokemonEditStoreInContext((state)=>state.setBottomState)
  const ability = usePokemonEditStoreInContext((state)=>state.ability)
  const nickname = usePokemonEditStoreInContext((state)=>state.nickname)
  const setNickname = usePokemonEditStoreInContext((state)=>state.nickname)




  
  return (
    <div>
      <div className="flex gap-16">
        <img
          src={pokemonSpecies?.teamBuilderSprite}
          alt={pokemonSpecies?.name || "Pokémon"}
          className="w-36 h-26 object-contain transition-transform transform hover:scale-110"
        />
        <div className="space-y-4">
          <div className="mb-2">
            <div className="grid gap-1">
              <Input value={pokemonSpecies?.name} disabled />

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
                value={ability?.name ? ability.name : ""}
                onClick={(e)=> {setBottomState(BottomState.ABILITIES)}}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p className="text-white">{pokemonSpecies?.type?.map((x) => x)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

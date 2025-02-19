import React from "react";
import { Move } from "../types/Move";
import { Pokemon } from "../types/Pokemon";
import { usePokemonEditStoreInContext } from "../Context/PokemonEditContext";
import { useShallow } from "zustand/react/shallow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Ability } from "../types/Ability";



export default function AbilityList() {
  const pokemonSpecies = usePokemonEditStoreInContext(
    useShallow((state) => state.pokemonSpecies)
  );

  const ability = usePokemonEditStoreInContext((state) => state.ability);

  const editPokemonApiRequest = usePokemonEditStoreInContext(
    (state) => state.editPokemonApiRequest
  );


  const onAbilityChange = async (ability: Ability) => {
    console.log("changing ability");

    const pokemonPartial = {
      ability: ability._id,
    };

    await editPokemonApiRequest(pokemonPartial, ["ability"]);
  };

  return (
    <div>
      <Table className="max-w-xl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokemonSpecies?.abilities?.map((a) => (
            <TableRow
              className="hover:cursor-pointer"
              onClick={() => {
                onAbilityChange(a);
              }}
            >
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.description}</TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

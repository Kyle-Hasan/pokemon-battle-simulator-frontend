import React, { useState } from "react";
import { Team } from "../types/Team";
import PokemonBar from "./PokemonBar";
import PokemonList from "./PokemonList";
import { Pokemon } from "../types/Pokemon";
import { PokemonSpecies } from "../types/PokemonSpecies";
import { gql, useMutation } from "@apollo/client";
import EditPokemon from "./EditPokemon";
import { PokemonEditContext, PokemonEditContextProvider } from "./Context/PokemonEditContext";

interface ViewTeamProps {
  team: Team;
}


const ADD_POKEMON = gql`
  mutation AddPokemon(
    $teamId: String!
    $nickname: String!
    $pokemonSpecies: String!
    $moves: [String!]
  ) {
    addPokemon(
      teamId: $teamId
      pokemon: {
        nickname: $nickname
        pokemonSpecies: $pokemonSpecies
        moves: $moves
      }
    ) {
      _id
      nickname
      pokemonSpecies {
        _id
        name
        teamBuilderSprite
        abilities {
          _id
          name
        }
        learnableMoves {
          _id
          name
          description
          type
          basePower
          accuracy
          category
        }
        type
      }
      moves {
      _id
        name
      }
    }
  }
`;


export default function ViewTeam({ team }: ViewTeamProps) {


 const [addingMode,setAddingMode] = useState(false)

 const [addPokemon, { data, loading, error }] = useMutation(ADD_POKEMON);
 const [selectedPokemon,setSelectedPokemon] = useState<Pokemon | null>(null)

 const handleAddPokemon = async (pokemonSpecies:PokemonSpecies) => {

  const response = await addPokemon({
    variables: {
      teamId: team._id,
      nickname: "",
      pokemonSpecies: pokemonSpecies._id,
      moves:[]
    }
  });
  if(!response || !response.data) {
    return null
  }
  
  return response.data.addPokemon

};

 const onPokemonChange = async (pokemon:PokemonSpecies)=> {
    const newPokemon:Pokemon = await handleAddPokemon(pokemon)

    if(!newPokemon) {
      return
    }

    setAddingMode(false)
    setSelectedPokemon(newPokemon)


 }

   
  return (
    <div>

      <PokemonBar setAddingMode={setAddingMode} pokemon={team.pokemon ? team.pokemon : []}>
      </PokemonBar>

      {
        addingMode && <PokemonList onPokemonChange={onPokemonChange}></PokemonList>
      }
      {
        selectedPokemon && <div className="flex justify-center">
          <PokemonEditContextProvider>
          <EditPokemon teamId={team._id ? team._id : ""} pokemon={selectedPokemon} />
          </PokemonEditContextProvider>
          </div>
      }

     
    </div>
  );
}

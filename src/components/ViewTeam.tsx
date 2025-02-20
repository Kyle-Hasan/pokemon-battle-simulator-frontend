import React, { useEffect, useState } from "react";
import { Team } from "../types/Team";
import PokemonBar from "./PokemonBar";
import PokemonList from "./PokemonList";
import { Pokemon } from "../types/Pokemon";
import { PokemonSpecies } from "../types/PokemonSpecies";
import { gql, useMutation } from "@apollo/client";
import EditPokemon from "./EditPokemon";
import { PokemonEditContextProvider, usePokemonEditStoreInContext } from "../Context/PokemonEditContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ViewTeamProps {
  teamProp: Team;
}

interface EditTeam {
  editTeam: Team;
}

const ADD_POKEMON = gql`
  mutation AddPokemon(
    $teamId: String!
    $nickname: String!
    $pokemonSpecies: String!
    $moves: [String!]
    $ability: String!
  ) {
    addPokemon(
      teamId: $teamId
      pokemon: {
        nickname: $nickname
        pokemonSpecies: $pokemonSpecies
        moves: $moves
        ability: $ability
      }
    ) {
      _id
      nickname
      ability {
        _id
        name
      }
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
        baseStats {
        hp
        attack
        specialAttack
        defense
        specialDefense
        speed
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

const EDIT_TEAM = gql`
  mutation EditTeam($team: AddTeamInput!) {
    editTeam(team: $team) {
      _id
      name
      pokemon {
        _id
        nickname
        pokemonSpecies {
          name
          _id
          type
        }
      }
    }
  }
`;

const DELETE_POKEMON = gql`
  mutation DeletePokemon($teamId: String!, $pokemonId: String!) {
    deletePokemon(teamId: $teamId, pokemonId: $pokemonId) {
      _id
      name
      pokemon {
        _id
        nickname
        pokemonSpecies {
          name
        }
      }
    }
  }
`;

export default function ViewTeam({ teamProp }: ViewTeamProps) {
  const [addingMode, setAddingMode] = useState(false);
 

  const [addPokemon] = useMutation(ADD_POKEMON, {
    update(cache, { data: { addPokemon } }) {
      cache.modify({
        fields: {
          getAllUserTeams(existingTeams = [], { readField }) {
            return existingTeams.map((team) => {
              if (readField("_id", team) === teamProp._id) {
                const pokemonRefs: readonly Pokemon[] =
                  readField("pokemon", team) || [];
                return { ...team, pokemon: [...pokemonRefs, addPokemon] };
              }
              return team;
            });
          },
        },
      });
    },
  });

  const [editTeam] = useMutation<EditTeam>(EDIT_TEAM);
  const [deletePokemon] = useMutation(DELETE_POKEMON,{
    update(cache, { data: { deletePokemon } }) {
      cache.modify({
        fields: {
          getAllUserTeams(existingTeams = [], { readField }) {
            return existingTeams.map((team) => {
              if (readField("_id", team) === teamProp._id) {
                const pokemonRefs: readonly Pokemon[] =
                  readField("pokemon", team) || [];
                const newPokemonRefs = pokemonRefs.filter(x=> x._id !== deletePokemon._id )
                return { ...team, pokemon: [...newPokemonRefs] };
              }
              return team;
            });
          },
        },
      });
    },
  });
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [team, setTeam] = useState<Team>({});
  const [teamName, setTeamName] = useState(teamProp.name);


  useEffect(()=> {
    setTeam({...teamProp})
  }, [teamProp])


  const handleAddPokemon = async (pokemonSpecies: PokemonSpecies) => {
   
    const response = await addPokemon({
      variables: {
        teamId: team._id,
        nickname: "",
        pokemonSpecies: pokemonSpecies._id,
        moves: [],
        level: 100,
        ability: pokemonSpecies.abilities?.[0]?._id || ""
      },
    });
    if (!response || !response.data) {
      return null;
    }

    return response.data.addPokemon;
  };

  const onPokemonChange = async (pokemon: PokemonSpecies) => {
    const newPokemon: Pokemon = await handleAddPokemon(pokemon);

    if (!newPokemon) {
      return;
    }
    let pokemonArr = [];
    if (team.pokemon) {
      pokemonArr = [...team.pokemon, newPokemon];
    } else {
      pokemonArr = [newPokemon];
    }
    team.pokemon = pokemonArr;
    setTeam({ ...team });

    setAddingMode(false);
    setSelectedPokemon(newPokemon);
  };

  const submitName = async () => {
    try {
      const response = await editTeam({
        variables: {
          team: {
            _id: team._id,
            name: teamName,
          },
        },
      });
      setTeamName(response.data?.editTeam.name);
    } catch (e) {
      console.error("error was found here", e);
    }
  };

  const deletePokemonRequest = async (pokemonId: string | undefined) => {
    await deletePokemon({
      variables: {
        teamId: team._id,
        pokemonId: pokemonId,
      },
    });

    const newPokemon = team.pokemon?.filter((x) => x._id !== pokemonId);
    setSelectedPokemon(null);

    setTeam({ ...team, pokemon: newPokemon });
  };

  

  return (
    <div className="flex flex-col gap-2 ml-16 w-screen">
      <div className="flex w-full border p-4">
        <form className="max-w-64">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <Button
            className="mt-2"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitName();
            }}
          >
            Submit Name
          </Button>
        </form>
        <div className="ml-4">
          <PokemonBar
            selectedPokemon={selectedPokemon}
            setAddingMode={setAddingMode}
            pokemon={team.pokemon ? team.pokemon : []}
            setSelectedPokemon={setSelectedPokemon}
          ></PokemonBar>
        </div>
      </div>

      {addingMode && (
        <div className="mx-64">
          <PokemonList onPokemonChange={onPokemonChange}></PokemonList>
        </div>
      )}
      {selectedPokemon && (
        <div className="flex justify-center mt-2  p-4 max-w-[60%] ">
          <Button
            onClick={() => {
              deletePokemonRequest(selectedPokemon._id);
            }}
          >
            Delete Pokemon
          </Button>
          <PokemonEditContextProvider>
            <EditPokemon
              teamId={team._id ? team._id : ""}
              pokemon={selectedPokemon}
            />
          </PokemonEditContextProvider>
        </div>
      )}
    </div>
  );
}

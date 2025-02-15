import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { createStore, useStore, StoreApi } from 'zustand';
import { PokemonSpecies } from '../../types/PokemonSpecies';
import { Ability } from '../../types/Ability';
import { Move } from '../../types/Move';
import { Stats } from '../../types/Stats';
import { gql, useMutation } from '@apollo/client';
import { Pokemon } from '../../types/Pokemon';



export enum BottomState {
  ABILITIES,
  MOVES,
  ITEMS,
  STATS,
  NONE
}

interface PokemonEditState {
  moves: Move[];
  ability?: Ability;
  pokemonId:string,
  setPokemonId: (id:string)=>void;
  setMoves: (moves: Move[]) => void;
  setAbility: (abilities: Ability) => void;
  bottomState:BottomState;
  setBottomState: (bottomState:BottomState) => void;
  pokemonSpecies?:PokemonSpecies
  setPokemonSpecies:(pokemonSpecies:PokemonSpecies) => void;
  pokemonStats?:Stats,
  setPokemonStats:(stats:Stats)=>void,
  editPokemonApiRequest: (pokemon: Partial<Pokemon>,  propertiesChanged: string[])=>void,
  teamId:string,
  setTeamId:(teamId:string)=>void,
  searchText:string,
  setSearchText:(text:string)=>void,
  editMoveIndex: number
  setEditMoveIndex:(index:number)=>void
}


export const PokemonEditContext = createContext<StoreApi<PokemonEditState> | null>(null);

interface PokemonEditProviderProps {
  children: ReactNode;
}

interface EditPokemon {
  editPokemon: Pokemon;
}




export const PokemonEditContextProvider = ({ children }: PokemonEditProviderProps) => {
  const storeRef = useRef<StoreApi<PokemonEditState>>(null);


  const EDIT_POKEMON = gql`
  mutation EditPokemon(
    $teamId: String!
    $pokemonId: String!
    $pokemon: AddPokemonInput!
  ) {
    editPokemon(teamId: $teamId, pokemonId: $pokemonId, pokemon: $pokemon) {
      _id
      nickname
      moves {
        name
      }
      ability {
        name
      }
      pokemonSpecies {
        name
      }
    }
  }
`;

  const [editPokemon, { data, loading, error }] = useMutation<EditPokemon>(EDIT_POKEMON);



  const editPokemonApiRequest = async (
    pokemon: Partial<Pokemon>,
 
    propertiesChanged: string[]
  ) => {
    debugger
    const store = storeRef.current?.getState()
    if(!store) {
      throw new Error("no store before api request")
    }

    const pokemonData = { ...pokemon, pokemonSpecies: store.pokemonSpecies?._id };
    const response = await editPokemon({
      variables: {
        teamId: store.teamId,
        pokemonId: store.pokemonId,
        pokemon: pokemonData,
      },
    });
  
    const newPokemon = response.data?.editPokemon;
    if (!newPokemon) {
      throw new Error("Failed to update Pokemon");
    }
  
    // Loop through each changed property and update the store accordingly
    propertiesChanged.forEach((prop) => {
     
      switch (prop) {
        case "moves":
          if (newPokemon.moves)
            store.setMoves(newPokemon.moves as Move[]);
          break;
        case "ability":
          if (newPokemon.ability)
            store.setAbility(newPokemon.ability as Ability);
          break;
        case "pokemonSpecies":
          if (newPokemon.pokemonSpecies)
            store.setPokemonSpecies(
              newPokemon.pokemonSpecies as PokemonSpecies
            );
          break;
        case "pokemonId":
          if (newPokemon._id)
            store.setPokemonId(newPokemon._id.toString());
          break;
        default:
          console.warn(`No setter defined for property "${prop}"`);
      }
    });
    store.setBottomState(BottomState.NONE)
  };




  if (!storeRef.current) {
    storeRef.current = createStore<PokemonEditState>((set) => ({
      moves: [],
      ability: undefined,
      pokemonId:"",
      setPokemonId: (id:string) => set({ pokemonId:id }),
      setMoves: (moves: Move[]) => set({ moves }),
      setAbility: (ability: Ability) => set({ ability }),
      bottomState: BottomState.NONE,
      setBottomState: (bottomState:BottomState) => set({bottomState}),
      pokemonSpecies:undefined,
      setPokemonSpecies: (pokemonSpecies:PokemonSpecies)=>set({pokemonSpecies}),
      pokemonStats:undefined,
      setPokemonStats: (stats:Stats) =>set({pokemonStats:stats}),
      teamId:"",
      setTeamId: (teamId:string) => set({teamId}),
      editPokemonApiRequest,
      searchText:"",
      setSearchText: (text:string)=> set({searchText:text}),
      editMoveIndex:-1,
      setEditMoveIndex: (index:number)=> set({editMoveIndex:index})
      

    }));
  }
  return (
    <PokemonEditContext.Provider value={storeRef.current}>
      {children}
    </PokemonEditContext.Provider>
  );
};

export const usePokemonEditStoreInContext = <T,>(selector: (state: PokemonEditState) => T): T => {
  const store = useContext(PokemonEditContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return useStore(store, selector);
};

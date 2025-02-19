import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { createStore, useStore, StoreApi } from 'zustand';
import { Ability } from '../types/Ability';
import { Move } from '../types/Move';
import { PokemonSpecies } from '../types/PokemonSpecies';
import { Stats } from '../types/Stats';
import { Pokemon } from '../types/Pokemon';
import { gql, useMutation } from '@apollo/client';




interface PokemonBattleState {
  

}


export const PokemonBattleContext = createContext<StoreApi<PokemonBattleState> | null>(null);

interface PokemonBattleProviderProps {
  children: ReactNode;
}






export const PokemonBattleContextProvider = ({ children }: PokemonBattleProviderProps) => {
  const storeRef = useRef<StoreApi<PokemonBattleState>>(null);







  if (!storeRef.current) {
    storeRef.current = createStore<PokemonBattleState>((set) => ({
 
      

    }));
  }
  return (
    <PokemonBattleContext.Provider value={storeRef.current}>
      {children}
    </PokemonBattleContext.Provider>
  );
};

export const usePokemonBattleStoreInContext = <T,>(selector: (state: PokemonBattleState) => T): T => {
  const store = useContext(PokemonBattleContext);
  if (!store) {
    throw new Error('Missing StoreProvider');
  }
  return useStore(store, selector);
};

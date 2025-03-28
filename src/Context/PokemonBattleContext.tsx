import React, { createContext, useContext, useRef, ReactNode } from "react";
import { createStore, useStore, StoreApi } from "zustand";

import { PokemonInBattle } from "../types/PokemonInBattle";
import { BattleTeam } from "../types/BattleTeam";
import { PlayerInfo } from "../types/PlayerInfo";
import { Environment } from "../types/Environment";
// split up state to reduce the amount of re renders needed
interface PokemonBattleState {
  battleId: string;
  setBattleId(battleId: string): void;
  playerActivePokemon: PokemonInBattle | null;
  enemyActivePokemon: PokemonInBattle | null;
  setPlayerActivePokemon: (pokemon: PokemonInBattle | null) => void;
  setEnemyActivePokemon: (pokemon: PokemonInBattle | null) => void;
  playerTeam: BattleTeam | null;
  setPlayerTeam: (playerTeam: BattleTeam) => void;
  enemyTeam: BattleTeam | null;
  setEnemyTeam: (enemyTeam: BattleTeam) => void;
  playerTrainerInfo: PlayerInfo | null;
  setPlayerTrainerInfo: (playerTrainerInfo: PlayerInfo) => void;
  enemyTrainerInfo: PlayerInfo | null;
  setEnemyTrainerInfo: (enemyTrainerInfo: PlayerInfo) => void;
  playerFreeSwitch: boolean;
  setPlayerFreeSwitch: (playerFreeSwitch: boolean) => void;
  enemyFreeSwitch: boolean;
  setEnemyFreeSwitch: (enemyFreeSwitch: boolean) => void;
  turnNumber: number;
  setTurnNumber: (turnNumber: number) => void;
  environment: Environment | null;
  setEnvironment: (environment: Environment) => void;
}

export const PokemonBattleContext =
  createContext<StoreApi<PokemonBattleState> | null>(null);

interface PokemonBattleProviderProps {
  children: ReactNode;
}

export const PokemonBattleContextProvider = ({
  children,
}: PokemonBattleProviderProps) => {
  const storeRef = useRef<StoreApi<PokemonBattleState>>(null);

  if (!storeRef.current) {
    storeRef.current = createStore<PokemonBattleState>((set) => ({
      battleId: "",
      setBattleId: (battleId: string) => set({ battleId }),
      playerActivePokemon: null,
      enemyActivePokemon: null,
      setPlayerActivePokemon: (pokemon: PokemonInBattle | null) =>
        set({ playerActivePokemon: pokemon }),
      setEnemyActivePokemon: (pokemon: PokemonInBattle | null) =>
        set({ enemyActivePokemon: pokemon }),
      playerTeam: null,
      enemyTeam: null,
      setPlayerTeam: (playerTeam: BattleTeam) => set({ playerTeam }),
      setEnemyTeam: (enemyTeam: BattleTeam) => set({ enemyTeam }),
      playerTrainerInfo: null,
      setPlayerTrainerInfo: (playerTrainerInfo: PlayerInfo) =>
        set({ playerTrainerInfo }),
      enemyTrainerInfo: null,
      setEnemyTrainerInfo: (enemyTrainerInfo: PlayerInfo) =>
        set({ enemyTrainerInfo }),
      playerFreeSwitch: false,
      setPlayerFreeSwitch: (playerFreeSwitch: boolean) =>
        set({ playerFreeSwitch }),
      enemyFreeSwitch: false,
      setEnemyFreeSwitch: (enemyFreeSwitch: boolean) =>
        set({ enemyFreeSwitch }),
      environment: null,
      setEnvironment: (environment: Environment) => set({ environment }),
      turnNumber: 0,
      setTurnNumber: (turnNumber: number) => set({ turnNumber }),
    }));
  }
  return (
    <PokemonBattleContext.Provider value={storeRef.current}>
      {children}
    </PokemonBattleContext.Provider>
  );
};

export const usePokemonBattleStoreInContext = <T,>(
  selector: (state: PokemonBattleState) => T
): T => {
  const store = useContext(PokemonBattleContext);
  if (!store) {
    throw new Error("Missing StoreProvider");
  }
  return useStore(store, selector);
};

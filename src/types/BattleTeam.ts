import { PlayerInfo } from "./PlayerInfo";
import { PokemonInBattle } from "./PokemonInBattle";


export interface BattleTeam {

   
  pokemonInBattle: PokemonInBattle[];

  numTotalPokemon: number;

  id: string;

  playerName:string;

  freeSwitch:boolean;

  playerInfo:PlayerInfo;


}
import { BattleEventType } from "./BattleEventType";
import { Environment } from "./Environment";
import { Move } from "./Move";
import { PokemonInBattle } from "./PokemonInBattle";

export interface BattleTurnEvent {
    type:BattleEventType;
    message:string;
    damage:number;
    crit:boolean;
    superEffective:boolean;
    pokemonId:string;
    leavingPokemonId:string;
    enteringPokemon:PokemonInBattle;
    moveUsed:Move;
    enviroment:Environment;
    userId:string


}
import { Environment } from "./Environment";
import { Move } from "./Move";
import { PokemonInBattle } from "./PokemonInBattle";

export class BattleUpdatePlayer {

 
  battleId!: string;

  
  changedPlayerPokemon!: PokemonInBattle[];

  
  changedEnemyPokemon!: PokemonInBattle[];

  environment!: Environment;

  
  movedFirst!: boolean;

  
  playerFreeSwitch!: boolean;

  
  enemyFreeSwitch!: boolean;


  playerDamage?: number;

  
  enemyDamage?: number;


  playerMoveUsed!: Move | null;


  enemyMoveUsed!: Move | null;


  playerLost!: boolean | null;

  enemyLost!: boolean | null;

  
  turnNumber!:number


  
  
  
}

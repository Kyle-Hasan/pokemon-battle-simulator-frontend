import { Environment } from "./Environment";
import { BattleTeam } from "./BattleTeam";
import { PlayerInfo } from "./PlayerInfo";


export interface Battle {
 
  id: string;


  playerTeam: BattleTeam;

 
  enemyTeam: BattleTeam;

  playerInfo:PlayerInfo;

  enemyInfo:PlayerInfo;

  turnNumber:number
 
  playerFreeSwitch: boolean;

  enemyFreeSwitch: boolean;

  environment: Environment;

 

 


}
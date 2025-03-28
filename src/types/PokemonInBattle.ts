import { Ability } from "./Ability";
import { Move } from "./Move";
import { Pokemon } from "./Pokemon";
import { PokemonSpecies } from "./PokemonSpecies";
import { Stats } from "./Stats";
import { Status } from "./Status";


export interface PokemonInBattle {

  
    pokemon:  Pokemon;

 
    status: Status;


    remainingHealth:number;


    isActive :boolean;

  
    statStage:Stats;




  
}

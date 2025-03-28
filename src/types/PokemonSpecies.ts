import { Ability } from "./Ability";
import { Move } from "./Move";
import { PokemonType } from "./PokemonType";
import { Stats } from "./Stats";

export interface PokemonSpecies {

    
    _id?: string;
  
  
    name: string;
  
    
    baseStats: Stats;
  
    battleFrontSprite: string;

    battleBackSprite:string;
  
  
     menuSprite: string;
  
    
    teamBuilderSprite: string;
  
 
    learnableMoves?: Move[];
  
   
    abilities?: Ability[];
  
  
    
  
    type?: PokemonType[];
  
  }
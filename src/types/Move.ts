import { PokemonType } from "./PokemonType";
import { PP } from "./PP";

export interface Move {

    
     _id?: string;
  
   
    name: string;
  
  
   
    description?: string;
  
  
    type?: PokemonType;
  
  
    basePower: number;
  
  
  
    accuracy?: number | null;
  
  
    category?: string;
  
    
    contact?: boolean;
  

    pp: PP;
  
  
  
    animation: string;
  }
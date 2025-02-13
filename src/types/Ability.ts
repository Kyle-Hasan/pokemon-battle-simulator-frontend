import { Effects } from "./Effect";

export interface Ability {

  
     _id?: string;


    name: string;

 
    description?: string;

 
    animation: string;


    effects?: Effects;
  }
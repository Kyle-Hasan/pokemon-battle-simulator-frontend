// Definition: This file defines the FieldEffects interface.
// It is used to define the effects that can be applied to the field in a Pokemon battle.
export interface FieldEffects {

  trickRoom: boolean;

  
  gravity: boolean;


  tailwind: number; // Turns remaining

 
  lightScreen: number;


  reflect: number;

  safeguard: number;
}
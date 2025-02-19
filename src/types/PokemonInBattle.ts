import { Ability } from "./Ability";
import { Move } from "./Move";
import { PokemonSpecies } from "./PokemonSpecies";

export interface PokemonInBattle {

  _id?: string;

  nickname?: string;

  pokemonSpecies?: PokemonSpecies

  moves: Move[] | string[]

  ability:Ability | string

  status:string

  teamBuilderSprite:string

  remainingHealth:number

  maxHealth:number



}
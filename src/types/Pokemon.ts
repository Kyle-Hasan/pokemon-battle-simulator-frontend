import { Ability } from "./Ability";
import { Move } from "./Move";
import { PokemonSpecies } from "./PokemonSpecies";
import { Stats } from "./Stats";

export interface Pokemon {

  _id?: string;

  nickname?: string;

  pokemonSpecies?: PokemonSpecies;

  moves: Move[] | string[];

  ability:Ability | string;

  stats:Stats;

  level:number;

}
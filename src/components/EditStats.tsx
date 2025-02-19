import React from 'react';
import { usePokemonEditStoreInContext } from '../Context/PokemonEditContext';
import StatBarEdit from './StatBarEdit';

export default function EditStats() {
  const pokemonSpecies = usePokemonEditStoreInContext((state) => state.pokemonSpecies);

  return (
    <div className=" mx-auto">
      <h1>Stats</h1>

      <div className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-4 font-bold border-b pb-2">
        <div>Stat</div>
        <div></div>
        <div className="text-center">EV</div>
     
        <div className="text-center">IV</div>
      </div>
 
      <StatBarEdit
        evs={0}
        ivs={0}
        name="HP"
        value={pokemonSpecies?.baseStats.hp ?? 0}
      />
      <StatBarEdit
        evs={0}
        ivs={0}
        name="Attack"
        value={pokemonSpecies?.baseStats.attack ?? 0}
      />
      <StatBarEdit
        evs={0}
        ivs={0}
        name="Defense"
        value={pokemonSpecies?.baseStats.defense ?? 0}
      />
      <StatBarEdit
        evs={0}
        ivs={0}
        name="Special Attack"
        value={pokemonSpecies?.baseStats.specialAttack ?? 0}
      />
      <StatBarEdit
        evs={0}
        ivs={0}
        name="Special Defense"
        value={pokemonSpecies?.baseStats.specialDefense ?? 0}
      />
      <StatBarEdit
        evs={0}
        ivs={0}
        name="Speed"
        value={pokemonSpecies?.baseStats.speed ?? 0}
      />
    </div>
  );
}

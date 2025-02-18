import React, { useState } from 'react'
import { Pokemon } from '../types/Pokemon'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { BottomState, usePokemonEditStoreInContext } from './Context/PokemonEditContext'
import MoveList from './MoveList'
import AbilityList from './AbilityList'
import EditStats from './EditStats'



export default function EditPokemonBottom() {

  const bottomState = usePokemonEditStoreInContext((x)=> x.bottomState )
  return (
    <div className="flex justify-center align-center mt-5">
      {
        bottomState === BottomState.MOVES && (<MoveList></MoveList>)
      }
       {
        bottomState === BottomState.ABILITIES && (<AbilityList></AbilityList>)
      }
       {
        bottomState === BottomState.STATS && (<EditStats></EditStats>)
      }
    </div>
  )
}

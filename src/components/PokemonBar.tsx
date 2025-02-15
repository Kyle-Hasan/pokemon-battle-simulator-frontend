import React from 'react'
import { Pokemon } from '../types/Pokemon'
import { Button } from './ui/button'

interface PokemonBarProps {
    pokemon:Pokemon[],
    setAddingMode: (adding:boolean)=>void
}

export default function PokemonBar({pokemon,setAddingMode}:PokemonBarProps) {

    
  return (
    <div>PokemonBar <Button onClick={()=>{setAddingMode(true)}}>Add</Button></div>
  )
}

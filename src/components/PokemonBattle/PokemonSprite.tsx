import React from 'react'

interface PokemonSpriteInterface {
  pokemonSpriteLink:string
}

export default function PokemonSprite({pokemonSpriteLink}: PokemonSpriteInterface) {
  return (
    <img className='w-16 h-16' src={pokemonSpriteLink}/>
  )
}

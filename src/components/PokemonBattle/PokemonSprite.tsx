import React, { forwardRef } from 'react';

interface PokemonSpriteProps {
  pokemonSpriteLink: string;
}

const PokemonSprite = forwardRef<HTMLImageElement, PokemonSpriteProps>(
  ({ pokemonSpriteLink }, ref) => <img ref={ref} className="w-16 h-16" src={pokemonSpriteLink} />
);

export default PokemonSprite;


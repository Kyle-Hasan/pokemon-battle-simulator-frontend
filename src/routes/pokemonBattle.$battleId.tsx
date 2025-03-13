import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import PokemonBattleView from '../components/PokemonBattle/PokemonBattleView'
import { gql, useQuery } from '@apollo/client';
import {Battle} from '../types/Battle'
import { PokemonBattleContext, PokemonBattleContextProvider } from '../Context/PokemonBattleContext';
export const Route = createFileRoute('/pokemonBattle/$battleId')({
  component: PokemonBattle,
})


const CREATE_BATTLE = gql`
  mutation RandomBattle {
    randomBattle {
        id
        team1 {
            pokemonInBattle {
                remainingHealth
                isActive
                pokemon {
                    _id
                    nickname
                    level
                    moves {
                        _id
                        name
                        description
                        type
                        basePower
                        accuracy
                        category
                        contact
                        animation
                    }
                    pokemonSpecies {
                        _id
                        name
                        battleBackSprite
                        battleFrontSprite
                        menuSprite
                        teamBuilderSprite
                        type
                    }
                }
            }
        }
        team2 {
            pokemonInBattle {
                remainingHealth
                isActive
                pokemon {
                    _id
                    nickname
                    level
                }
            }
        }
        environment {
            weather {
                type
                duration
            }
            terrain {
                type
                duration
            }
            fieldEffects {
                trickRoom
                gravity
                tailwind
                lightScreen
                reflect
                safeguard
            }
            hazards {
                spikes
                toxicSpikes
                stealthRock
                stickyWeb
            }
        }
    }
}
`;

interface CreateBattle {
  randomBattle: Battle;
}
export default function PokemonBattle() {
  const {battleId} = Route.useParams()
  const {data,loading,error} = useQuery<CreateBattle>(CREATE_BATTLE)



  if(loading) {
    return <div></div>
  }

  else if(error) {
    return <div></div>
  }

  return (
    <div className='w-full h-screen'>
    <PokemonBattleContextProvider>
   <PokemonBattleView battle={data as unknown as Battle}/>
   </PokemonBattleContextProvider>
   </div>
  )
}

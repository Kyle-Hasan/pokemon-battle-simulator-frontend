import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useState } from 'react'
import PokemonBattleView from '../components/PokemonBattle/PokemonBattleView'
import { gql, useMutation, useQuery } from '@apollo/client';
import {Battle} from '../types/Battle'
import { PokemonBattleContext, PokemonBattleContextProvider } from '../Context/PokemonBattleContext';
export const Route = createFileRoute('/pokemonBattle/$battleId')({
  component: PokemonBattle,
})


const CREATE_BATTLE = gql`
mutation RandomBattle {
    randomBattle {
        id
        playerSwitch
        enemySwitch
        turnNumber
        playerTeam {
            id
            freeSwitch
            numTotalPokemon
            pokemonInBattle {
                remainingHealth
                isActive
                pokemon {
                    _id
                    nickname
                    level
                    pokemonSpecies {
                        _id
                        name
                        battleBackSprite
                        battleFrontSprite
                        menuSprite
                        teamBuilderSprite
                        type
                    }
                    stats {
                        hp
                        attack
                        defense
                        specialAttack
                        specialDefense
                        speed
                    }
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
                }
                statStages {
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
                }
                status {
                    primary
                    confused
                }
            }
        }
        enemyTeam {
            id
            freeSwitch
            numTotalPokemon
            pokemonInBattle {
                remainingHealth
                isActive
                pokemon {
                    _id
                    nickname
                    level
                    pokemonSpecies {
                        _id
                        name
                        battleBackSprite
                        battleFrontSprite
                        menuSprite
                        teamBuilderSprite
                        type
                    }
                    stats {
                        hp
                        attack
                        defense
                        specialAttack
                        specialDefense
                        speed
                    }
                }
                status {
                    primary
                    confused
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
            hazards {
                spikes
                toxicSpikes
                stealthRock
                stickyWeb
            }
            fieldEffects {
                trickRoom
                gravity
                tailwind
                lightScreen
                reflect
                safeguard
            }
        }
        playerInfo {
            playerName
            playerAvatarURL
        }
        enemyInfo {
            playerName
            playerAvatarURL
        }
    }
}
`;

interface CreateBattle {
  randomBattle: Battle;
}
export default function PokemonBattle() {
  const {battleId} = Route.useParams()
  const[getBattle] = useMutation<CreateBattle>(CREATE_BATTLE)
  const [battle,setBattle] = useState<Battle | null>(null)

useEffect(()=> {
    const fetch = async()=> {
      
        const res = await getBattle()
        setBattle(res.data?.randomBattle ?? null)
    }
    fetch()
} , [getBattle])



return (
    <>
      {battle && (
        <div className="w-full h-screen">
          <PokemonBattleContextProvider>
            <PokemonBattleView battle={battle} />
          </PokemonBattleContextProvider>
        </div>
      )}
    </>
  );
}

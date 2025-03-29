import React from "react";
import PokemonSprite from "./PokemonSprite";
import ShowTrainerInfo from "./ShowTrainerInfo";
import MoveSelector from "./MoveSelector";
import { Move } from "../../types/Move";
import { PokemonType } from "../../types/PokemonType";
import InBattleTeamDisplay from "./InBattleTeamDisplay";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import { BattleUpdatePlayer } from "../../types/BattleUpdatePlayer";
import PokemonStatusBars from "./PokemonStatusBars";
import { Battle } from "../../types/Battle";
import { usePokemonBattleStoreInContext } from "../../Context/PokemonBattleContext";
import { gql, useMutation, useSubscription } from "@apollo/client";

const MAKE_MOVE = gql`
  mutation UpdateBattle(
    $battleId: ID!
    $userId: ID!
    $pokemonId: ID!
    $moveId: ID!
    $isMove: Boolean!
    $switchPokemonId: ID!
  ) {
    updateBattle(
        moveInput: {
            battleId: $battleId
            userId: $userId
            pokemonId: $pokemonId
            isMove: $isMove
            moveId: $moveId
            switchPokemonId: $switchPokemonId
        }
    )
}
`;



const BATTLE_UPDATE_SUBSCRIPTION = gql`
  subscription BattleUpdate($battleId: String!) {
    battleUpdate(battleId: $battleId) {
      battleId
        movedFirst
        playerFreeSwitch
        enemyFreeSwitch
        playerDamage
        enemyDamage
        playerLost
        enemyLost
        turnNumber
        changedPlayerPokemon {
            remainingHealth
            isActive
            pokemon {
                _id
                nickname
                level
                stats {
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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
                    pp {
                        base
                        max
                    }
                }
                ability {
                    _id
                    name
                    description
                    animation
                }
            }
            status {
                primary
                confused
            }
            statStages {
                hp
                attack
                defense
                specialAttack
                specialDefense
                speed
            }
        }
        changedEnemyPokemon {
            remainingHealth
            isActive
            pokemon {
                _id
                nickname
                level
                stats {
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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
            status {
                primary
                confused
            }
            statStages {
                hp
                attack
                defense
                specialAttack
                specialDefense
                speed
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
        playerMoveUsed {
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
        enemyMoveUsed {
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
  }
`;



export default function PokemonBattleBattleField() {


  const [makeMove] = useMutation(MAKE_MOVE);

  

  const playerTeam = usePokemonBattleStoreInContext((state)=> state.playerTeam);
  const enemyTeam = usePokemonBattleStoreInContext((state)=> state.enemyTeam);
  const playerFreeSwitch = usePokemonBattleStoreInContext((state)=> state.playerFreeSwitch);
  const enemyFreeSwitch = usePokemonBattleStoreInContext((state)=> state.enemyFreeSwitch);
  const playerActivePokemon = usePokemonBattleStoreInContext((state)=> state.playerActivePokemon);
  const enemyActivePokemon = usePokemonBattleStoreInContext((state)=> state.enemyActivePokemon);
  const playerTrainerInfo = usePokemonBattleStoreInContext((state)=> state.playerTrainerInfo);
  const enemyTrainerInfo = usePokemonBattleStoreInContext((state)=> state.enemyTrainerInfo);
  const battleId = usePokemonBattleStoreInContext((state)=> state.battleId);
  const setEnemyActivePokemon = usePokemonBattleStoreInContext((state)=> state.setEnemyActivePokemon);
  const setPlayerActivePokemon = usePokemonBattleStoreInContext((state)=> state.setPlayerActivePokemon);
  const setEnvironment = usePokemonBattleStoreInContext((state)=> state.setEnvironment);
  const setPlayerFreeSwitch = usePokemonBattleStoreInContext((state)=> state.setPlayerFreeSwitch);
  const setEnemyFreeSwitch = usePokemonBattleStoreInContext((state)=> state.setEnemyFreeSwitch);
  const setEnemyTeam = usePokemonBattleStoreInContext((state)=> state.setEnemyTeam);
  const setPlayerTeam = usePokemonBattleStoreInContext((state)=> state.setPlayerTeam);

  console.log(" battle id  " , battleId)


  useSubscription(BATTLE_UPDATE_SUBSCRIPTION, {
    variables: { battleId },
    onData: ({ data} ) => {
      const {battleUpdate}= data.data as {battleUpdate:BattleUpdatePlayer};
     
     console.log("subscribe data" , battleUpdate);
     updateStateAfterMove(battleUpdate);
    },
    onError: (error)=> {
      debugger
      console.error(error)
    }
   
   
  }); 


  const updateStateAfterMove = (battleUpdate:BattleUpdatePlayer)=> {

    const {changedEnemyPokemon,changedPlayerPokemon,environment,playerMoveUsed,enemyMoveUsed} = battleUpdate;

    // keep track of switches (implement later)
    const playerPokemonChanged = changedPlayerPokemon[0].pokemon._id === playerActivePokemon?.pokemon._id;
    const enemyPokemonChanged = changedEnemyPokemon[0].pokemon._id === enemyActivePokemon?.pokemon._id;

    // assume that last pokemon is the new active one (in case of moves that switch like u turn or when i implement double battles)
    setPlayerActivePokemon(changedPlayerPokemon[changedPlayerPokemon.length-1]);
    setEnemyActivePokemon(changedEnemyPokemon[changedEnemyPokemon.length-1]);



    


  }


  
  

  console.log("active pokemon ", playerActivePokemon)

  const onMoveClick = async(move: Move) => {
    await makeMove( {
      variables: {
      moveId: move._id,
      isMove:true,
      pokemonId:playerActivePokemon?.pokemon._id,
      switchPokemonId:"",
      battleId,
      userId:"67abe4c8201f9cd643c552bf"
    }});
    
  };
  return (
    <div
      className="w-[35%] border p-8 "
      style={{
        backgroundImage:
          "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d841b5t-d14186ca-887a-4f10-b4ca-b16d5aaff49a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0MWI1dC1kMTQxODZjYS04ODdhLTRmMTAtYjRjYS1iMTZkNWFhZmY0OWEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5Pv6KPt53igISARqXxlqkRR4qtwKEB3LhHLyc1OQ9Wo')",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%"
      }}
    >
      <h1 className="ml-32 text-black mt-8 font-bold">Turn 2</h1>

      {/*Opponent Team*/}
      <div className="ml-[50%]">
      <div className="flex gap-12">
      { enemyActivePokemon &&
     
           <div>
            <PokemonStatusBars
              name={enemyActivePokemon.pokemon?.pokemonSpecies?.name ?? ""}
              level={enemyActivePokemon.pokemon?.level}
              status={enemyActivePokemon?.status}
              percentHealth={enemyActivePokemon?.remainingHealth / enemyActivePokemon.pokemon.stats.hp * 100}
            ></PokemonStatusBars>
            <PokemonSprite pokemonSpriteLink={enemyActivePokemon?.pokemon.pokemonSpecies?.battleFrontSprite ?? ""} />
          </div>
      }
          <ShowTrainerInfo
            trainerName={enemyTrainerInfo?.playerName ?? ""}
            trainerImageLink="https://play.pokemonshowdown.com/sprites/trainers/acetrainer-gen4.png"
            trainerTeamImageLink={[
              "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
            ]}
          /> 
        </div> 
      </div>
      {/*Your Team*/}
      <div className="ml-4">
        <div className="flex gap-12">
          <ShowTrainerInfo
            trainerName={playerTrainerInfo?.playerName ?? ""}
            trainerImageLink="https://play.pokemonshowdown.com/sprites/trainers/archer.png"
            trainerTeamImageLink={[
              "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
            ]}
          />

          {playerActivePokemon &&
          <div className="self-end">
            <PokemonStatusBars
              name={playerActivePokemon.pokemon.pokemonSpecies?.name ?? ""}
              level={45}
              status={playerActivePokemon.status}
              percentHealth={playerActivePokemon.remainingHealth / playerActivePokemon.pokemon.stats.hp * 100}
            ></PokemonStatusBars>
            <PokemonSprite pokemonSpriteLink={playerActivePokemon.pokemon?.pokemonSpecies?.battleBackSprite ?? ""} />
          </div>

            }
        </div>

        <div></div>
        <div className="ml-[15%]">
           { playerActivePokemon && <MoveSelector moves={playerActivePokemon.pokemon?.moves as Move[]} onClick={onMoveClick}></MoveSelector>}
          <InBattleTeamDisplay team={playerTeam?.pokemonInBattle ?? []}></InBattleTeamDisplay>
        </div>
      </div>
    </div>
  );
}

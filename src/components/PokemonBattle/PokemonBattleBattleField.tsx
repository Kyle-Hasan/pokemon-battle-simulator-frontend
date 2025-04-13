import React, { useState,useEffect, useRef } from "react";
import ShowTrainerInfo from "./ShowTrainerInfo";
import MoveSelector from "./MoveSelector";
import { Move } from "../../types/Move";
import InBattleTeamDisplay from "./InBattleTeamDisplay";
import { BattleTurnEvent } from "../../types/BattleTurnEvent";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import { BattleTeam } from "../../types/BattleTeam";
import ActivePokemon from "./ActivePokemon";
import { useBattleAnimation } from "../animations/useBattleAnimation";




interface PokemonBattleBattleFieldProps {
  playerActivePokemon:PokemonInBattle | null,
  enemyActivePokemon:PokemonInBattle | null,
  enemyTeam:BattleTeam | null,
  playerTeam:BattleTeam | null,
  onMoveClick: (move: Move)=>void,
  activeEvent: BattleTurnEvent | null,

}



export default function PokemonBattleBattleField({
  playerActivePokemon,
  enemyActivePokemon,
  enemyTeam,
  playerTeam,
  onMoveClick,
  activeEvent
}:PokemonBattleBattleFieldProps) {


  const [playerPokemonActiveEvent,setPlayerPokemonActiveEvent] = useState<BattleTurnEvent | null>(null);

  const [enemyPokemonActiveEvent, setEnemyPokemonActiveEvent] = useState<BattleTurnEvent | null>(null);

  const fieldRef = useRef<HTMLDivElement>(null);

  const playerPokemonRef = useRef<HTMLImageElement>(null);

  const enemyPokemonRef = useRef<HTMLImageElement>(null);


  const {play} = useBattleAnimation();


  //subscribe to active event so that we can play send them to the right component to play animations

  useEffect(
      ()=> {

        if(activeEvent?.pokemonId === playerActivePokemon?.pokemon._id) {
          setPlayerPokemonActiveEvent(activeEvent);
        }

        else if(activeEvent?.pokemonId === enemyActivePokemon?.pokemon._id) {
          setEnemyPokemonActiveEvent(activeEvent);
        }
        if(activeEvent?.moveUsed.name) {
        play(fieldRef.current as HTMLElement,playerPokemonRef.current as HTMLElement,enemyPokemonRef.current as HTMLElement,activeEvent?.moveUsed.name);
        }

      }
    ,[activeEvent]
  )


  

  return (
    <div
    ref={fieldRef}
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
      <div className="ml-[40%]">
      <div className="flex gap-12">
      { enemyActivePokemon &&
     
           <ActivePokemon ref={enemyPokemonRef} activeEvent={enemyPokemonActiveEvent} activePokemon={enemyActivePokemon} player={false}></ActivePokemon>
      }
          <ShowTrainerInfo
            trainerName={enemyTeam?.playerInfo?.playerName ?? ""}
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
            trainerName={playerTeam?.playerName ?? ""}
            trainerImageLink="https://play.pokemonshowdown.com/sprites/trainers/archer.png"
            trainerTeamImageLink={[
              "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
            ]}
          />

          {playerActivePokemon &&
          <ActivePokemon ref={playerPokemonRef} activeEvent={playerPokemonActiveEvent} activePokemon={playerActivePokemon} player={true}></ActivePokemon>

            }
        </div>
            
       
        <div className="ml-[15%]">
          {activeEvent &&
          <div className="mt-4 bg-black/50 p-2 w-100">
            {activeEvent?.message}  
            </div>
            }
           { playerActivePokemon && <MoveSelector moves={playerActivePokemon.pokemon?.moves as Move[]} onClick={onMoveClick}></MoveSelector>}
          <InBattleTeamDisplay team={playerTeam?.pokemonInBattle ?? []}></InBattleTeamDisplay>
        </div>
      </div>
    </div>
  );
}

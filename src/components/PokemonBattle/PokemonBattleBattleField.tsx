import React from "react";
import PokemonSprite from "./PokemonSprite";
import ShowTrainerInfo from "./ShowTrainerInfo";
import MoveSelector from "./MoveSelector";
import { Move } from "../../types/Move";
import { PokemonType } from "../../types/PokemonType";
import InBattleTeamDisplay from "./InBattleTeamDisplay";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import PokemonStatusBars from "./PokemonStatusBars";
import { Battle } from "../../types/Battle";
import { usePokemonBattleStoreInContext } from "../../Context/PokemonBattleContext";



export default function PokemonBattleBattleField() {





  const playerTeam = usePokemonBattleStoreInContext((state)=> state.playerTeam)
  const enemyTeam = usePokemonBattleStoreInContext((state)=> state.enemyTeam)
  const playerFreeSwitch = usePokemonBattleStoreInContext((state)=> state.playerFreeSwitch)
  const enemyFreeSwitch = usePokemonBattleStoreInContext((state)=> state.enemyFreeSwitch)
  const playerActivePokemon = usePokemonBattleStoreInContext((state)=> state.playerActivePokemon)
  const enemyActivePokemon = usePokemonBattleStoreInContext((state)=> state.enemyActivePokemon)
  const playerTrainerInfo = usePokemonBattleStoreInContext((state)=> state.playerTrainerInfo)
  const enemyTrainerInfo = usePokemonBattleStoreInContext((state)=> state.enemyTrainerInfo)
  

  

  const onMoveClick = (move: Move) => {
    console.log("A move was click", move);
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
      { enemyActivePokemon &&
        <div className="flex gap-12">
           <div>
            <PokemonStatusBars
              name={enemyActivePokemon?.pokemonSpecies?.name ?? ""}
              level={enemyActivePokemon?.level}
              status={enemyActivePokemon?.status}
              percentHealth={enemyActivePokemon?.remainingHealth}
            ></PokemonStatusBars>
            <PokemonSprite pokemonSpriteLink={enemyActivePokemon?.pokemonSpecies?.battleSprite ?? ""} />
          </div>
          <ShowTrainerInfo
            trainerName={enemyTrainerInfo?.playerName ?? ""}
            trainerImageLink="https://play.pokemonshowdown.com/sprites/trainers/acetrainer-gen4.png"
            trainerTeamImageLink={[
              "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
            ]}
          /> 
        </div> }
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
          <div className="self-end">
            <PokemonStatusBars
              name="oshawott"
              level={100}
              status="burn"
              percentHealth={45}
            ></PokemonStatusBars>
            <PokemonSprite pokemonSpriteLink="https://play.pokemonshowdown.com/sprites/gen5ani-back/oshawott.gif" />
          </div>
        </div>

        <div></div>
        <div className="ml-[15%]">
           { playerActivePokemon && <MoveSelector moves={playerActivePokemon?.moves as Move[]} onClick={onMoveClick}></MoveSelector>}
          <InBattleTeamDisplay team={playerTeam?.pokemonInBattle ?? []}></InBattleTeamDisplay>
        </div>
      </div>
    </div>
  );
}

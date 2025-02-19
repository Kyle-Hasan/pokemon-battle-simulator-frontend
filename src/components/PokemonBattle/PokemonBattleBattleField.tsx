import React from "react";
import PokemonSprite from "./PokemonSprite";
import ShowTrainerInfo from "./ShowTrainerInfo";
import MoveSelector from "./MoveSelector";
import { Move } from "../../types/Move";
import { PokemonType } from "../../types/PokemonType";
import InBattleTeamDisplay from "./InBattleTeamDisplay";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import PokemonStatusBars from "./PokemonStatusBars";

export default function PokemonBattleBattleField() {
  const moves: Move[] = [
    {
      _id: "23",
      name: "Aqua Jet",
      type: PokemonType.WATER,
      basePower: 40,
      animation: "",
      pp: {
        base: 7,

        max: 3,
      },
    },
    {
      _id: "23",
      name: "Aqua Jet",
      type: PokemonType.WATER,
      basePower: 40,
      animation: "",
      pp: {
        base: 7,

        max: 3,
      },
    },
    {
      _id: "23",
      name: "Aqua Jet",
      type: PokemonType.WATER,
      basePower: 40,
      animation: "",
      pp: {
        base: 7,

        max: 3,
      },
    },
    {
      _id: "23",
      name: "Aqua Jet",
      type: PokemonType.WATER,
      basePower: 40,
      animation: "",
      pp: {
        base: 7,

        max: 3,
      },
    },
  ];

  const pokemonArray: PokemonInBattle[] = [
    {
      _id: "1",
      nickname: "Sparky",
      pokemonSpecies: {
        _id: "p1",
        name: "Pikachu",
        baseStats: {
          hp: 35,
          attack: 55,
          defense: 40,
          specialAttack: 50,
          specialDefense: 50,
          speed: 90,
        },
        battleSprite: "https://example.com/pikachu-battle.png",
        menuSprite: "https://example.com/pikachu-menu.png",
        teamBuilderSprite:
          "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
        learnableMoves: [
          { name: "Thunder Shock", basePower: 40, type: PokemonType.ELECTRIC },
          { name: "Quick Attack", basePower: 40, type: PokemonType.NORMAL },
          {
            name: "Tail Whip",
            basePower: 0,
            type: PokemonType.NORMAL,
            pp: {
              base: 30,
              max: 48,
            },
            animation: "",
          },
        ],
        abilities: [
          {
            name: "Static",
            description: "May paralyze on contact.",
            animation: "static-animation",
          },
        ],
        type: [PokemonType.ELECTRIC],
      },
      moves: [
        { name: "Thunderbolt", basePower: 90, type: PokemonType.ELECTRIC },
        { name: "Quick Attack", basePower: 40, type: PokemonType.NORMAL },
      ],
      ability: {
        name: "Static",
        description: "May paralyze on contact.",
        animation: "static-animation",
      },
    },
    {
      _id: "2",
      nickname: "Blaze",
      pokemonSpecies: {
        _id: "p2",
        name: "Charizard",
        baseStats: {
          hp: 78,
          attack: 84,
          defense: 78,
          specialAttack: 109,
          specialDefense: 85,
          speed: 100,
        },
        battleSprite: "https://example.com/charizard-battle.png",
        menuSprite: "https://example.com/charizard-menu.png",
        teamBuilderSprite:
          "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
        learnableMoves: [
          { name: "Flamethrower", basePower: 90, type: PokemonType.FIRE },
          { name: "Dragon Claw", basePower: 80, type: PokemonType.DRAGON },
          { name: "Air Slash", basePower: 75, type: PokemonType.FLYING },
        ],
        abilities: [
          {
            name: "Blaze",
            description: "basePowers up Fire-type moves when HP is low.",
            animation: "blaze-animation",
          },
        ],
        type: [PokemonType.FIRE, PokemonType.FLYING],
      },
      moves: [
        { name: "Flamethrower", basePower: 90, type: PokemonType.FIRE },
        { name: "Dragon Claw", basePower: 80, type: PokemonType.DRAGON },
        { name: "Air Slash", basePower: 75, type: PokemonType.FLYING },
      ],
      ability: {
        name: "Blaze",
        description: "basePowers up Fire-type moves when HP is low.",
        animation: "blaze-animation",
      },
    },
    {
      _id: "3",
      nickname: "Aqua",
      pokemonSpecies: {
        _id: "p3",
        name: "Blastoise",
        baseStats: {
          hp: 79,
          attack: 83,
          defense: 100,
          specialAttack: 85,
          specialDefense: 105,
          speed: 78,
        },
        battleSprite: "https://example.com/blastoise-battle.png",
        menuSprite: "https://example.com/blastoise-menu.png",
        teamBuilderSprite:
          "https://play.pokemonshowdown.com/sprites/gen5icons/29.png",
        learnableMoves: [
          { name: "Hydro Pump", basePower: 110, type: PokemonType.WATER },
          { name: "Ice Beam", basePower: 90, type: PokemonType.ICE },
          { name: "Skull Bash", basePower: 130, type: PokemonType.NORMAL },
        ],
        abilities: [
          {
            name: "Torrent",
            description: "basePowers up Water-type moves when HP is low.",
            animation: "torrent-animation",
          },
        ],
        type: [PokemonType.WATER],
      },
      moves: [
        { name: "Hydro Pump", basePower: 110, type: PokemonType.WATER },
        { name: "Ice Beam", basePower: 90, type: PokemonType.ICE },
      ],
      ability: {
        name: "Torrent",
        description: "basePowers up Water-type moves when HP is low.",
        animation: "torrent-animation",
      },
    },
  ];

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
        <div className="flex gap-12">
          <div>
            <PokemonStatusBars
              name="Tepig"
              level={56}
              status="freeze"
              percentHealth={89}
            ></PokemonStatusBars>
            <PokemonSprite pokemonSpriteLink="https://play.pokemonshowdown.com/sprites/gen5ani/tepig.gif" />
          </div>
          <ShowTrainerInfo
            trainerName="kano"
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
            trainerName="reona"
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
          <MoveSelector moves={moves} onClick={onMoveClick}></MoveSelector>
          <InBattleTeamDisplay team={pokemonArray}></InBattleTeamDisplay>
        </div>
      </div>
    </div>
  );
}

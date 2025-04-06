import React, { useEffect, useReducer, useState } from "react";
import PokemonBattleBattleField from "./PokemonBattleBattleField";
import PokemonBattleTurnInfo from "./PokemonBattleTurnInfo";
import { Battle } from "../../types/Battle";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { BattleTurnEvent } from "../../types/BattleTurnEvent";
import { BattleTeam } from "../../types/BattleTeam";
import { PokemonInBattle } from "../../types/PokemonInBattle";
import { BattleEventType } from "../../types/BattleEventType";
import { Move } from "../../types/Move";
import { BattleUpdatePlayer } from "../../types/BattleUpdatePlayer";

const MAKE_MOVE = gql`
  mutation UpdateBattle(
    $battleId: ID!
    $userId: ID!
    $userPokemonId: ID!
    $moveId: ID!
    $isMove: Boolean!
    $switchPokemonId: ID!
    $teamId: ID!
    $targetPokemonId: ID!
  ) {
    updateBattle(
        moveInput: {
            battleId: $battleId
            userId: $userId
            userPokemonId: $userPokemonId
            isMove: $isMove
            moveId: $moveId
            switchPokemonId: $switchPokemonId
            targetPokemonId: $targetPokemonId
            teamId: $teamId
        }
    )
}
`;

const BATTLE_UPDATE_SUBSCRIPTION = gql`
  subscription BattleUpdate($battleId: String!) {
    battleUpdate(battleId: $battleId) {
      battleId
      events {
        type
        message
        damage
        crit
        superEffective
        pokemonId
        leavingPokemonId
        turnNumber
        enteringPokemon {
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
        }
        moveUsed {
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
        environment {
          weather {
            type
            duration
          }
        }
      }
    }
  }
`;

interface PokemonBattleViewProps {
  battle: Battle;
}

interface CurrentBattleState {
  enemyTeam: BattleTeam | null;
  playerTeam: BattleTeam | null;
  playerActivePokemon: PokemonInBattle | null;
  enemyActivePokemon: PokemonInBattle | null;
  events: BattleTurnEvent[];
  battleId: string;

}

interface Action {
  type: string;
  payload: CurrentBattleState | BattleTurnEvent;
}

const battleReducer = (state: CurrentBattleState, action: Action) => {
  debugger
  switch (action.type) {
    case "intialize":
      return action.payload as CurrentBattleState;

    case "update": {
     
      const event = action.payload as BattleTurnEvent;
      const playerEvent =
        event.pokemonId === state.enemyActivePokemon?.pokemon._id;
      if (event.type === BattleEventType.DAMAGE) {
        if (!playerEvent) {
          state.enemyActivePokemon!.remainingHealth -= event.damage;
          // add status later
        } else if (playerEvent) {
          state.playerActivePokemon!.remainingHealth -= event.damage;
        }
      } else if (event.type === BattleEventType.FAINT) {
        if (playerEvent) {
          state.playerActivePokemon = null;
        } else {
          state.enemyActivePokemon = null;
        }
      } else if (event.type === BattleEventType.SWITCH_OUT) {
        if (playerEvent) {
          state.playerActivePokemon = null;
        } else {
          state.enemyActivePokemon = null;
        }
      } else if (event.type === BattleEventType.SWITCH_IN) {
        if (playerEvent) {
          state.playerActivePokemon = event.enteringPokemon;
        } else {
          state.enemyActivePokemon = event.enteringPokemon;
        }
      }
     
      state.events = [...state.events, event];

      return state;
    }

    default:
      return state;
  }
};

export default function PokemonBattleView({ battle }: PokemonBattleViewProps) {
  const [makeMove] = useMutation(MAKE_MOVE);
  const [activeEvent, setActiveEvent] = useState<BattleTurnEvent | null>(null);

  const [state, dispatch] = useReducer(battleReducer, {
    enemyTeam: battle.enemyTeam,
    playerTeam: battle.playerTeam,
    playerActivePokemon: battle.playerTeam.pokemonInBattle.find(p=> p.isActive) ?? null,
    enemyActivePokemon: battle.enemyTeam.pokemonInBattle.find(p=> p.isActive) ?? null,
    events: [],
    battleId: battle.id,
   
  });
  const skipSubscription = !battle?.id;

  // subscribe to battle updates
   const { data, error } = useSubscription<{battleUpdate:BattleUpdatePlayer}>(BATTLE_UPDATE_SUBSCRIPTION, {
    skip: skipSubscription,
    variables: { battleId: battle?.id || "" },
  });

  
  useEffect(() => {
    if (error) {
      console.error("Subscription error:", error);
    }
  }, [error]);

 
  useEffect(() => {

    if (!data) return;

   
    const { battleUpdate } = data;
    const events = battleUpdate?.events ?? [];
    events.forEach((e, index) => {
     
      setTimeout(() => {
        dispatch({type:"update",payload:e});
        setActiveEvent(e);
      }, 1000 * index);
    });
    
  }, [data]);



  const onMoveClick = async (move: Move) => {
    try {
      await makeMove({
        variables: {
          moveId: move._id,
          isMove: true,
          userPokemonId: state.playerActivePokemon?.pokemon._id,
          switchPokemonId: "",
          battleId: state.battleId,
          userId: "67abe4c8201f9cd643c552bf",
          targetPokemonId: "67b6a8451760cc59c36f1a9c",
          teamId: state?.playerTeam?.id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full flex justify-center align-center mt-32">
      {battle && (
        <>
          {" "}
          <PokemonBattleBattleField
            activeEvent={activeEvent}
            onMoveClick={onMoveClick}
            playerActivePokemon={state.playerActivePokemon}
            enemyActivePokemon={state.enemyActivePokemon}
            enemyTeam={state.enemyTeam}
            playerTeam={state.playerTeam}
          />
          <PokemonBattleTurnInfo events={state.events}  />
        </>
      )}
    </div>
  );
}

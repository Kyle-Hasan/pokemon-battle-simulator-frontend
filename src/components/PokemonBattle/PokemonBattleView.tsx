import React from 'react'
import PokemonBattleBattleField from './PokemonBattleBattleField'
import PokemonBattleTurnInfo from './PokemonBattleTurnInfo'
import { Battle } from '../../types/Battle'
import { usePokemonBattleStoreInContext } from '../../Context/PokemonBattleContext'

interface PokemonBattleViewProps {
  battle:Battle
}

export default function PokemonBattleView({battle}:PokemonBattleViewProps) {

  const setPlayerTeam = usePokemonBattleStoreInContext((state)=> state.setPlayerTeam)
  const setEnemyTeam = usePokemonBattleStoreInContext((state)=>state.setEnemyTeam)
  const setPlayerTrainerInfo = usePokemonBattleStoreInContext((state)=> state.setPlayerTrainerInfo)
  const setEnemyTrainerInfo = usePokemonBattleStoreInContext((state)=> state.setEnemyTrainerInfo)
  const setPlayerFreeSwitch = usePokemonBattleStoreInContext((state)=> state.setPlayerFreeSwitch)
  const setEnemyFreeSwitch = usePokemonBattleStoreInContext((state)=> state.setEnemyFreeSwitch)
  const setTurnNumber = usePokemonBattleStoreInContext((state)=> state.setTurnNumber)

  setPlayerTeam(battle.playerTeam)
  setEnemyTeam(battle.enemyTeam)
  setPlayerTrainerInfo(battle.playerInfo)
  setEnemyTrainerInfo(battle.enemyInfo)
  setPlayerFreeSwitch(battle.playerFreeSwitch)
  setEnemyFreeSwitch(battle.enemyFreeSwitch)
  setTurnNumber(battle.turnNumber)
  


  return (
    <div className='w-full flex justify-center align-center mt-32'><PokemonBattleBattleField/><PokemonBattleTurnInfo/></div>
  )
}

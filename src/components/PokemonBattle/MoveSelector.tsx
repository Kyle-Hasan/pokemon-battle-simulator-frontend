import React from 'react'
import { Move } from '../../types/Move'
import MoveCard from './MoveCard'

interface MoveSelectorProps {
  moves:Move[]
  onClick:(move:Move)=>void
}

export default function MoveSelector({moves,onClick}:MoveSelectorProps) {
  return (
    <div className='mt-8 flex gap-4'>
      {
        moves.map((move)=> {
          return (<MoveCard onClick={onClick} move={move} ></MoveCard>)
        })
      }
    </div>
  )
}

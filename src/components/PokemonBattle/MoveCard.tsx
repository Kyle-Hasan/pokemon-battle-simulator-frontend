import React from 'react'
import { Move } from '../../types/Move'
import { Button } from '../ui/button'

interface MoveCardProps {
    move:Move
    onClick:(move:Move)=>void
}
export default function MoveCard({move,onClick}:MoveCardProps) {
  return (
    <Button onClick={()=> {onClick(move)}} className='border p-4'>{move.name}</Button>
  )
}

import React, { useMemo } from 'react'
import { BattleTurnEvent } from '../../types/BattleTurnEvent'

interface PokemonBattleTurnInfoProps {
  events: BattleTurnEvent[]
}

interface GroupedEvents {
  turnNumber:number,
  events:BattleTurnEvent[]
}

function PokemonBattleTurnInfo({ events }: PokemonBattleTurnInfoProps) {
  const groupedEvents = useMemo(() => {

    if(!events) {   
    return []
    }
    const grouped:GroupedEvents[] = [];

    for(const event of events) {

      if(grouped.length !== 0 && grouped[grouped.length-1].turnNumber == event.turnNumber) {
        grouped[grouped.length-1].events.push(event);
      }
      else {
        grouped.push({events:[event], turnNumber: event.turnNumber})
      }


    }

    return grouped;


  } , [events])

  return (
    <div className='ml-2'>
      {groupedEvents && groupedEvents.length > 0 && 
         groupedEvents.map(grouped => (
          <div className='font-bold' key={grouped.turnNumber}>
            <div>Turn {grouped.turnNumber}</div>
            {grouped?.events.map((event, idx) => (
              <div key={idx}>{event.message}</div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default React.memo(PokemonBattleTurnInfo)

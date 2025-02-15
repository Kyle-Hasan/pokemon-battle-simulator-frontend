import React from 'react'
import { Move } from '../types/Move'
import { Pokemon } from '../types/Pokemon'
import { usePokemonEditStoreInContext } from './Context/PokemonEditContext'
import { useShallow } from 'zustand/react/shallow'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

/*
 _id?: string;
  
   
    name: string;
  
  
   
    description?: string;
  
  
    type?: PokemonType;
  
  
    basePower: number;
  
  
  
    accuracy?: number | null;
  
  
    category?: string;
  
    
    contact?: boolean;
  

    pp: PP;
  
  
  
    animation: string;
    */


export default function MoveList() {

  const pokemonSpecies = usePokemonEditStoreInContext(useShallow((state)=>state.pokemonSpecies));

  const moves = usePokemonEditStoreInContext((state)=>state.moves)



  const editPokemonApiRequest = usePokemonEditStoreInContext((state)=>state.editPokemonApiRequest);

  const editMoveIndex = usePokemonEditStoreInContext((state)=>state.editMoveIndex)

  const onMoveChange = async(move:Move)=> {
    console.log("changing move")
 
    const movesCopy = [...moves,move].filter((x): x is Move => x !== undefined && x !== null).map(x => {
      return x._id as string
    })

   
    const pokemonPartial = {
      moves:movesCopy as string[]
  
    }
   
    await editPokemonApiRequest(pokemonPartial,["moves"])
  }




  return (
    <div>
        
         <Table className="max-w-xl">
              <TableHeader>
                <TableRow>
                  
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Base Power</TableHead>
    
                  <TableHead>Accuracy</TableHead>
                  <TableHead>Description</TableHead>
               
                  <TableHead>Category</TableHead>
                  
                </TableRow>
              </TableHeader>
              <TableBody>
                {pokemonSpecies?.learnableMoves?.map((move) => (
                  <TableRow className="hover:cursor-pointer" onClick={()=> {onMoveChange(move)}}>
                    <TableCell>{move.name}</TableCell>
                    <TableCell>{move.type}</TableCell>
                    
                    <TableCell>{move.basePower}</TableCell>
                    <TableCell>{move.accuracy}</TableCell>
                    <TableCell>{move.description}</TableCell>
                  
                    <TableCell>{move.category}</TableCell>
                    
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
    </div>
  )
}

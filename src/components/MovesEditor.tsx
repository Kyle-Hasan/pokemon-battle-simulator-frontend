import React, { useEffect, useState } from "react";
import { Move } from "../types/Move";
import { Pokemon } from "../types/Pokemon";
import { Input } from "./ui/input";
import MoveList from "./MoveList";
import { BottomState, usePokemonEditStoreInContext } from "../Context/PokemonEditContext";
import { stat } from "fs";



export default function MovesEditor() {


  const moves = usePokemonEditStoreInContext((state)=>state.moves)

  const initalizeTextValues = ()=>{
   
      const textInputArr = []
      for(const move of moves) {
          textInputArr.push(move.name)
      }
      const remaining = 4-textInputArr.length
      for(let i = 0; i < remaining;i++) {
        textInputArr.push("")
      }
      return textInputArr
  }
  

  
  const [textInputValues,setTextInputValues] = useState<string[]>([])
  const  editMoveIndex = usePokemonEditStoreInContext((state)=>state.editMoveIndex)
  const setEditMoveIndex = usePokemonEditStoreInContext((state)=>state.setEditMoveIndex)
 
  const setSearchText = usePokemonEditStoreInContext((state)=>state.setSearchText)

  const setBottomState = usePokemonEditStoreInContext((state)=>state.setBottomState)
  

  const onInputChange = (input: string, index: number) => {
   
    setEditMoveIndex(index)
    setSearchText(input)
    textInputValues[index] = input
    setTextInputValues([...textInputValues])
    
    

  };

  useEffect(()=> {
    setTextInputValues(initalizeTextValues())
  }, [moves])

  return (
    <div className="flex flex-col">
      <h1>Moves</h1>
      <div className="flex flex-col gap-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <Input
            key={index}
            type="text"
            value={textInputValues[index]}
            onClick={()=> {setEditMoveIndex(index); setBottomState(BottomState.MOVES)}}
            onChange={(e) => onInputChange(e.target.value, index)}
          />
        ))}
      </div>

    </div>
  );
}

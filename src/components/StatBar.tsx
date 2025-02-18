import React, { useEffect, useState } from 'react'


interface StatBarProps {
    name:string
    value:number
    small:boolean
}

export default function StatBar({name,value,small}:StatBarProps) {

 const [heightClass,setHeightClass] = useState('')



 const [widthPercentage,setWidthPercentage] = useState(0)

 const [backgroundColor, setBackgroundColor] = useState('')


 useEffect(()=> 
    {

        setHeightClass(small ? 'h-2' : 'h-4')
    
       
       
        const widthPercentageCalc = Math.min((value / 100) * 100, 100);
        setWidthPercentage(widthPercentageCalc) 

        if(widthPercentageCalc < 50) {
           
            setBackgroundColor('bg-red-400')
        }
        else if(widthPercentageCalc >= 50) {
            
            setBackgroundColor('bg-green-500')
        }



 } , [value,small])

 

  return (
    <div>
    <div className="flex justify-between">
      <span>{name}</span>
      <span>{value}</span>
    </div>
    <div className="w-full bg-gray-200">
      <div
        className={`${heightClass} ${backgroundColor}`}
        style={{ width: `${widthPercentage}%` }}
      ></div>
    </div>
  </div>
  )
}

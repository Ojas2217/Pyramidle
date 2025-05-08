import React from "react";
const Key = ({val, onClick, letters}) =>{
    return(
        <button
         id = {val}
         onClick={()=>onClick(val)}
         className={`key flex justify-center items-center ${(val!=="ENTER")?"w-[7vw] max-w-9":"w-[16vw] max-w-16"} h-[8vh] max-h-14 rounded-lg m-1 bg-gray-500 m-0.1 font-semibold hover:scale-90 transition ${letters[val.toLowerCase()]}`}>
            {val}
        </button>
    )
}
const Row = ({value , onClick, letters}) =>{
    return(
        <div className="row flex flex-row justify-center">
            {value.map((val,i)=>(
                <Key key={i} val={val} onClick={onClick} letters = {letters}/>
            ))
            }
        </div>
    )
}
export default function Keyboard({onClick,letterStates}){
    const rows =[
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["ENTER","Z","X","C","V","B","N","M","⌫"]
    ]

    return(
        <div className="kb flex flex-col items-center justify-center p-4">
        {rows.map((row,i)=>(
            <Row key={i} value={row} onClick={onClick} letters={letterStates}/>
        ))
        }
        </div>
    )
}
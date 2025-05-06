import React from "react";

const Key = ({val}) =>{
    return(
        <button className="key w-[7vw] h-[8vh] max-w-9 max-h-14 rounded-lg m-1 bg-gray-500 m-0.1 font-semibold">
            {val}
        </button>
    )
}
const Row = ({value}) =>{
    return(
        <div className="row flex flex-row justify-center">
            {value.map((val,i)=>(
                <Key key={i} val={val}/>
            ))
            }
        </div>
    )
}
export default function Keyboard(){
    const rows =[
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ]

    return(
        <div className="kb flex flex-col items-center justify-center p-4">
        {rows.map((row,i)=>(
            <Row key={i} value={row}/>
        ))
        }
        </div>
    )
}
    import { MdOutlineLightMode,MdOutlineDarkMode,MdHelpOutline } from "react-icons/md";
    import { useEffect, useState } from "react";
    export default function Header() {
        const [dark,setDark] = useState(true);
        const [help,setHelp] = useState(false);

        useEffect(()=>{
            const dark = localStorage.getItem("theme")==="dark";
            setDark(dark);
            document.documentElement.classList.toggle("dark",dark)
        },[])

        const  toggleDark =async()=>{
            const newDark = !dark
            setDark(newDark);
            localStorage.setItem("theme", newDark ? "dark" : "light");
            document.documentElement.classList.toggle("dark",newDark)
        }
        return(
        <header className = "head w-full h-24 mb-4 pl-8 pr-8 bg-white dark:bg-black text-gray-500 flex items-center justify-between border-b border-gray-500">
            <div className="relative"onMouseEnter={()=>setHelp(true)} onMouseLeave={()=>setHelp(false)}>
                <MdHelpOutline className="help scale-[2.5] hover:scale-[3] transition "/>{
                    help?(
                        <div className ="helpbox absolute mt-20 w-72 p-2 bg-gray-500 bg-opacity-100  text-black text-sm rounded  font-semibold">
                            <p>Welcome to Pyramidle!</p>
                            <p>You get 5 guesses to guess a 5 letter word.</p>
                            <p>You start off guessing a one letter word, then two, then three and so on.</p>
                            <p>New word on every refresh, Good Luck!</p>
                            
                        </div>
                    ):""
                }
            </div>
            <div>
                <img alt="The Pyramidle logo" src="logo-square.svg" className="logo scale-50 hover:scale-[0.6] transition"></img>
            </div>
            <div>
                {
                dark?
                <MdOutlineLightMode onClick={toggleDark} className="dark scale-[2.5] hover:scale-[3] transition"/>
                :<MdOutlineDarkMode onClick={toggleDark} className="dark scale-[2.5] hover:scale-[3] transition"/>
                }
            </div>
            
        </header>
        )
    }
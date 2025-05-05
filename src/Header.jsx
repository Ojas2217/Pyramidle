import { MdOutlineLightMode,MdOutlineDarkMode,MdHelpOutline } from "react-icons/md";
export default function Header() {
    return(
    <header className = "head w-full h-24 mb-4 pl-8 pr-8 bg-[#000000] text-gray-500 flex items-center justify-between border-b border-gray-500">
        <div>
            <MdHelpOutline className="help  scale-[2.5] hover:scale-[3] transition"/>
        </div>
        <div>
            <img alt="The Pyramidle logo" src="logo-square.svg" className="logo scale-50 hover:scale-[0.6] transition"></img>
        </div>
        <div>
            <MdOutlineDarkMode className="dark scale-[2.5] hover:scale-[3] transition"/>
        </div>
        
    </header>
    )
}
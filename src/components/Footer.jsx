
import { FaInstagram,FaGithub,FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="foot bg-white dark:bg-black flex items-center justify-between w-full h-auto text-gray-500 border-t border-gray-500">
      
      <div className="icons flex space-x-2 ml-2">
        <a href ="https://www.instagram.com/ojas2217/"><FaInstagram className="i size-12 hover:scale-110 transition"/></a>
        <a href ="https://github.com/Ojas2217/Pyramidle"><FaGithub className="g size-12 hover:scale-110 transition"/></a>
        <a href ="https://www.linkedin.com/in/ojas-pandey-06a318240/"><FaLinkedin className="l size-12 hover:scale-110 transition"/></a>
      </div>

      <div className="logo invisible lg:visible">
        <img alt="Pyramidle Logo" src = "/logo-text.svg" className="w-full p-4 "></img>
      </div>

      <div className="copyright font-semibold text-sm lg:text-xl text-wrap">
        <p className=" mr-4 w-max">Made by Ojas ©{(new Date()).getFullYear()}</p>
      </div>

    </footer>
  )
}


import { FaInstagram,FaGithub,FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="foot bg-[#000000] mt-32 flex items-end justify-between w-full h-28 text-gray-500  border-t border-gray-500">
      
      <div className="icons mb-2 ml-4 flex space-x-2">
        <a href ="https://www.instagram.com/ojas2217/"><FaInstagram className="i size-12 hover:scale-110 transition"/></a>
        <a href ="https://github.com/Ojas2217"><FaGithub className="g size-12 hover:scale-110 transition"/></a>
        <a href ="https://www.linkedin.com/in/ojas-pandey-06a318240/"><FaLinkedin className="l size-12 hover:scale-110 transition"/></a>
      </div>

      <div className="logo">
        <img alt="Pyramidle Logo" src = "/logo-text.svg" className="w-full max-w-none scale-[1.8] mb-6"></img>
      </div>

      <div className="copyright font-semibold text-xl">
        <p className=" mr-4 mb-2 w-max">Made by Ojas ©{(new Date()).getFullYear()}</p>
      </div>

    </footer>
  );
}

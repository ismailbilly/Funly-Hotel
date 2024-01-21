import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="bg-[#0D445F] py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Funly.com</Link>
        </span>
        <span className=" flex space-x-2">
          <Link
            to="/register"
            className="flex items-center bg-[#B6BABF] text-[#0D445F] px-3 font-bold hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header
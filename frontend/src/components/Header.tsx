import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext";
import SignOut from "./SignOut";


const Header = () => {
  const { isLoggedIn } = useAppContext()
  console.log(isLoggedIn);
  
  return (
    <div className="bg-[#0D445F] py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Funly.com</Link>
        </span>
        <span className=" flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/rmy-bookings"
                className="flex items-center bg-[#B6BABF] text-[#0D445F] px-3 font-bold hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center bg-[#B6BABF] text-[#0D445F] px-3 font-bold hover:bg-gray-100"
              >
                My Hotels
              </Link>
              <SignOut />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-[#B6BABF] text-[#0D445F] px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header
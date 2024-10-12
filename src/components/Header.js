import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  return (
    <>
      <div className="flex justify-between shadow-lg">
        <div className="logo-container">
          <img className="w-24" src={LOGO_URL} />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className="px-4">
              Online Status:{onlineStatus === "online" ? "🟢" : "🔴"}
            </li>
            <li className="px-4">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/about">About Us</Link>
            </li>
            <li className="px-4">
              {" "}
              <Link to="/grocery">Grocery</Link>
            </li>
            <button
              onClick={() =>
                btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
              }
            >
              {btnName}
            </button>
            <li className="px-4 font-bold"> {loggedInUser}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

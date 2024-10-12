import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "defaultUser",
});

export default UserContext;

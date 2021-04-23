import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

const  useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn =  async (authToken) => {
    const user = jwtDecode(authToken);
    console.log(user);
    setUser(user);
    await authStorage.storeToken(authToken);
};

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};


export default useAuth ;
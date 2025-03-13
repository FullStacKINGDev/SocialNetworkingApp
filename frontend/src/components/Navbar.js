import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1>Social Network App</h1>
      <p>T-Machine Software Solutions - TM250101</p>
      {user ? (
        <div className="user-info">
          <span>Welcome Back!</span>
        </div>
      ) : (
        <span>Please log in</span>
      )}
    </nav>
  );
};

export default Navbar;

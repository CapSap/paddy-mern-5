import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <Link to="/">Store view</Link>
      <Link to="/entry">Entry</Link>
      <Link to="/ecom">Ecom View</Link>
    </div>
  );
};

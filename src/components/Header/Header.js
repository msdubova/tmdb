import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  return (
    <span onClick={handleClick} className="header">
      TMDb
    </span>
  );
};

export default Header;

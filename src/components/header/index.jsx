import marvelLogo from "../../assets/marvel-logo.png";
import marvelBackground from "../../assets/super-heroes.png";

const Header = () => {
  return (
    <div className="upper-side-container">
      <img
        src={marvelBackground}
        width="1920"
        height="1101"
        alt="super-heroes"
        className="super-heroes-img"
      />
      <img
        src={marvelLogo}
        alt="marvel-logo"
        width="600"
        height="290"
        className="marvel-logo-img"
      />
    </div>
  );
};

export default Header;

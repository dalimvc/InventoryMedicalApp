import { Link } from "react-router-dom";
//navbar component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  px-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"><h1>Lagerhantering</h1></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link">Artiklar</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/create" className="nav-link">Lägg till</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/updatera" className="nav-link">Uppdatera</Link>
            </li>
            <li className="nav-item">
              <Link to="/delete" className="nav-link">Radera</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

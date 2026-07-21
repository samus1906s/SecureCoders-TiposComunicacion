import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          SmartNotify Solutions
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nueva-solicitud">Nueva solicitud</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notificaciones">Notificaciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">Chat</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/evaluacion/1">Evaluación</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
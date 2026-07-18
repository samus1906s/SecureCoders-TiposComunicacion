import { NavLink } from "react-router-dom";

export default function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container">

                <NavLink
                    className="navbar-brand"
                    to="/"
                >

                    SmartNotify Solutions

                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    aria-controls="menu"
                    aria-expanded="false"
                    aria-label="Mostrar menú"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menu"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/"
                            >

                                Dashboard

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/notificaciones"
                            >

                                Notificaciones

                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                className="nav-link"
                                to="/chat"
                            >

                                Chat

                            </NavLink>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}
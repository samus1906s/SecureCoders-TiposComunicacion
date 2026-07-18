export default function Navbar(){

    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container">

                <a
                    className="navbar-brand"
                    href="/"
                >

                    SmartNotify Solutions

                </a>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menu"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <a
                                className="nav-link"
                                href="/"
                            >

                                Dashboard

                            </a>

                        </li>

                        <li className="nav-item">

                            <a
                                className="nav-link"
                                href="/chat"
                            >

                                Chat

                            </a>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}
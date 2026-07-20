import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/navbar";
import Notificaciones from "./pages/notificaciones";
import Dashboard from "./pages/dashboard";


export default function App() {

    return (

        <>

            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/notificaciones"
                    element={<Notificaciones />}
                />

            </Routes>

        </>

    );

}
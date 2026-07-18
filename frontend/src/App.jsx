import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/navbar";
import Notificaciones from "./pages/notificaciones";

export default function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route
                    path="/notificaciones"
                    element={<Notificaciones />}
                />

            </Routes>

        </>

    );

}
import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/navbar.jsx";

import Notificaciones from "./pages/notificaciones.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ChatPage from "./pages/chatPage.jsx";

import useNotificaciones from "./hooks/useNotificaciones.js";


export default function App() {

    const {
        notificaciones,
        cargando,
        error
    } = useNotificaciones("sse");


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
                    element={

                        <Notificaciones

                            notificaciones={
                                notificaciones
                            }

                            cargando={
                                cargando
                            }

                            error={
                                error
                            }

                        />

                    }
                />

                <Route
                    path="/chat"
                    element={<ChatPage />}
                />

            </Routes>

        </>

    );

}
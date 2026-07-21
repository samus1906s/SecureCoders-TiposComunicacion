import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/navbar.jsx";

import Notificaciones from "./pages/notificaciones.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ChatPage from "./pages/chatPage.jsx";
import DetalleSolicitud from "./pages/DetalleSolicitud";
import NuevaSolicitud from "./pages/NuevaSolicitud";

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


                <Route
                    path="/solicitud/:id"
                    element={<DetalleSolicitud />}
                />

                <Route
                    path="/nueva-solicitud"
                    element={<NuevaSolicitud />}
                />
            </Routes>

        </>

    );

}
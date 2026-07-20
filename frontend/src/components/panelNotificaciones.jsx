import Card from "./Card";
import ItemNotificacion from "./itemNotificacion";

export default function PanelNotificaciones({

    notificaciones = []

}) {

    return (

        <Card>

            <div className="panel-notificaciones">

                <div className="panel-titulo">

                    <h4 className="mb-0">

                        <i className="bi bi-bell me-2"></i>

                        Notificaciones

                    </h4>

                </div>

                {
                    notificaciones.length === 0 ? (

                        <div className="text-center py-4">

                            <p className="mb-0 text-muted">

                                No existen notificaciones.

                            </p>

                        </div>

                    ) : (

                        notificaciones.map((notificacion) => (

                            <ItemNotificacion

                                key={
                                    `${notificacion.solicitudId}-${notificacion.fecha}`
                                }

                                solicitudId={
                                    notificacion.solicitudId
                                }

                                estado={
                                    notificacion.estado
                                }

                                mensaje={
                                    notificacion.mensaje
                                }

                                fecha={
                                    notificacion.fecha
                                }

                            />

                        ))

                    )
                }

            </div>

        </Card>

    );

}
import Card from "./Card";


export default function PanelNotificaciones({ notificaciones }) {

    return (

        <Card>

            <div className="panel-notificaciones">

                <div className="panel-titulo">

                    <h4>

                        Notificaciones

                    </h4>

                </div>

                {

                    notificaciones.length === 0 ? (

                        <div className="text-center py-4">

                            <p className="mb-0">

                                No existen notificaciones.

                            </p>

                        </div>

                    ) : (

                        notificaciones.map((notificacion) => (

                            <ItemNotificacion

                                key={notificacion.id}

                                solicitudId={notificacion.solicitudId}

                                estado={notificacion.estado}

                                mensaje={notificacion.mensaje}

                                fecha={notificacion.fecha}

                            />

                        ))

                    )

                }

            </div>

        </Card>

    );

}
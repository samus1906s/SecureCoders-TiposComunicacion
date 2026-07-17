import "../styles/table.css";
import Badge from "./badge";

export default function Table({

    columnas = [],

    datos = [],

    acciones

}) {

    return (

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead className="table-dark">

                    <tr>
                        {
                            columnas.map((columna) => (

                                <th key={columna}>

                                    {columna}

                                </th>

                            ))
                        }

                        {
                            acciones &&

                            <th>

                                Acciones

                            </th>
                        }

                    </tr>

                </thead>

                <tbody>

                    {
                        datos.length > 0 ?

                            datos.map((fila) => (

                                <tr key={fila.id}>

                                    <td>{fila.id}</td>

                                    <td>{fila.cliente}</td>

                                    <td>{fila.asunto}</td>

                                    <td>

                                        <Badge estado={fila.estado} />

                                    </td>

                                    <td>{fila.fecha}</td>

                                    {
                                        acciones &&

                                        <td>

                                            {acciones(fila)}

                                        </td>

                                    }

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan={columnas.length + 1}
                                    className="text-center"
                                >

                                    No hay registros.

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}
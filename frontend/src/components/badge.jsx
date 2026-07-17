import "../styles/badge.css";

export default function Badge({

    estado

}){

    let color="secondary";

    switch(estado){

        case "Pendiente":
            color="warning";
        break;

        case "Asignada":
            color="info";
        break;

        case "En proceso":
            color="primary";
        break;

        case "Finalizada":
            color="success";
        break;

        case "Cancelada":
            color="danger";
        break;

        default:
            color="secondary";

    }

    return(

        <span className={`badge text-bg-${color}`}>

            {estado}

        </span>

    );

}
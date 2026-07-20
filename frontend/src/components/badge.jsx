export default function Badge({

    estado

}){

    let color="secondary";

    switch(estado){

        case "pendiente":
            color="warning";
        break;

        case "asignada":
            color="info";
        break;

        case "en proceso":
            color="primary";
        break;

        case "finalizada":
            color="success";
        break;

        case "cancelada":
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
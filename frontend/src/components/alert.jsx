export default function Alert ({
    tipo = "success",
    mensaje 
}) {

    return (

        <div
        className= {`alert alert-${tipo}`} role="alert"
        >
            {mensaje}
            
        </div>
    )
}
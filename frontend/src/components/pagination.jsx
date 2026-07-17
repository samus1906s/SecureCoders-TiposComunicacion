import "../styles/pagination.css";

export default function Pagination({

    paginaActual,

    totalPaginas,

    cambiarPagina

}){

    const paginas=[];

    for(let i=1;i<=totalPaginas;i++){

        paginas.push(i);

    }

    return(

        <nav>

            <ul className="pagination justify-content-center">

                {

                    paginas.map((pagina)=>(

                        <li
                            key={pagina}
                            className={`page-item ${pagina===paginaActual ? "active":""}`}
                        >

                            <button
                                className="page-link"
                                onClick={()=>cambiarPagina(pagina)}
                            >

                                {pagina}

                            </button>

                        </li>

                    ))

                }

            </ul>

        </nav>

    );

}
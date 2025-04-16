import "./PageNavegation.css"

export function PageNavegation(props) {
    /*
        Array.from({ length: props.totalPages })
        Arriba lo que hago es crear un array con un largo
        determinado en el total de Paginas disponibles.

        Como no puedo usar un for loop para devolver los elementos,
        Ya que igual tendria que crear un arreglo y luego recorrerlo,
        creo uno con un largo definido guardando undefined en cada posicion
        y luego mapeo ese arreglo para devolver otro lleno de elementos html.

        Esto me permite crear la cantidad de elementos que quiero usando un numero.
    */
    return (
        <section className="pageNavigation">
                <button onClick={() => { props.handlePageNav("Previus") }} className={`${props.hasPrevius ? "" : "invisible"}`}>
                    {"<"}
                </button>
                <ul>
                    {Array.from({ length: props.totalPages }).map((_, i) => {
                        const page = i + 1
                        return (
                            <li key={"Page " + page}>
                                <button onClick={() => { props.handlePageNav(page) }} className={`${props.currentPage === page ? "active" : ""}`} aria-current={props.currentPage === page ? {page} : undefined}>
                                    {page}
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={() => { props.handlePageNav("Next") }} className={`${props.hasNext ? "" : "invisible"}`}>
                    {">"}
                </button>
        </section>
    )
}
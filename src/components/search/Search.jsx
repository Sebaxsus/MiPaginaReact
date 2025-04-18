import './Search.css'

function hideGenres(elemento) {
    
    elemento.add("animate-[disappear_300ms_linear]")
    elemento.remove("animate-[appear_300ms_linear]")
    setTimeout(() => {
        elemento.add("invisible")
    },290)
}

function showGenres(elemento) {
    elemento.add("animate-[appear_300ms_linear]")
    elemento.remove("invisible")
    elemento.remove("animate-[disappear_300ms_linear]")
}

export function Search(props) {
    return (
        <>
            <button className='generosButton' onClick={() => {document.getElementsByClassName("search-Pills")[0].classList.contains("invisible") ? showGenres(document.getElementsByClassName("search-Pills")[0].classList) : hideGenres(document.getElementsByClassName("search-Pills")[0].classList) }}>
                <svg viewBox='0 0 24 24' height={20} width={20}>
                    <g stroke='currentColor' strokeWidth={1} fill='currentColor'>
                        <rect x="2" y="5" width={20} height={3} rx="2" ry="2" />
                        <rect x="2" y="12" width={20} height={3} rx="2" ry="2" />
                        <rect x="2" y="20" width={20} height={3} rx="2" ry="2" />
                    </g>
                </svg>
                Generos
            </button>
            <ul className="search-Pills invisible">
                {props.generos.map((genero) => {
                    return (
                        <li
                            className={`search-Pill ${genero.id === props.queryGenre ? "active" : ""}`}
                            key={genero.id}
                            onClick={() => { props.handleClickGenre(genero.id, props.queryGenre) }}
                        >
                            {genero.name}
                        </li>
                    )
                })}
            </ul>
            <form onSubmit={(e) => { props.handleSearchBarAction(e) }} className="search-Form">
                <div>
                    <input type="search" name="title" id="SearchBar" onChange={(e) => { props.setSearchTitle(e.target.value) }} />
                    <button>
                        Buscar
                    </button>
                </div>
            </form>
        </>
    )
}
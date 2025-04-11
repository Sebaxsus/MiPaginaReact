import './Search.css'

export function Search(props) {
    return (
        <>
            <ul className="search-Pills ">
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
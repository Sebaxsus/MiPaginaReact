import './navBar.css'

const pag = "Mangas Library"

export function NavBar () {
    return(
        <div className="nav-container">
            <div className="nav-text">
                <img src='/Eula.jpg' alt='imagen' className='nav-logo'></img>
                <h1>Probando Siuu</h1>
            </div>
            <div className='nav-Title'>
                <h1>Pagina { pag }</h1>
            </div>
            <div className="nav-list">
                <ul>
                    <li>Home</li>
                    <li>Library</li>
                </ul>
            </div>
        </div>
    )
}
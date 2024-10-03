import { Link } from 'wouter'

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
                    {
                    /*  Con Wooter y Link estoy usando su funcion para que haga
                        Un History.push del Navegador
                        
                        -Es decir usar lo renderizado por el navegador
                        Luego el route de wooter actualizara el enlace luego hara match
                        Con el historial del navegador y rederizara el componente sin
                        Recargar la pagina - 
                        
                        Esto es un sigle page Aplication -
                        
                        Todo esto se consigue cambiando el <a href='link'></a> por
                        <Link to='link'></Link>
                    */
                    }
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/Mangas'><li>Library</li></Link>
                </ul>
            </div>
        </div>
    )
}
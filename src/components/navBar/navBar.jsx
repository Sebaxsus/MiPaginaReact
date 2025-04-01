import { Link, useLocation } from 'wouter'

import './navBar.css'
import Post from '../../pages/Mangas/MangaPost'
import AnimePost from '../../pages/Animes/AnimePost'

const pag = "Mangas Library"

export function NavBar(props) {
    const [location, navigate] = useLocation()
    console.log("Ubi: ",location)
    return (
        <>
            <nav className="nav-text">
                <img src='/Eula.jpg' alt='imagen' className='nav-logo'></img>
                <h1>Probando Siuu</h1>
                {(location === '/Mangas') ? <Post setChange={props.setChange}/> : <AnimePost setChange={props.setChange}/>}
            </nav>

            <nav className='nav-Title'>
                <h1>Pagina { pag }</h1>
            </nav>

            <nav className="nav-list">
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
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Mangas'>Mangas</Link></li>
                    <li><Link to='/Animes'>Anime</Link></li>
                </ul>
            </nav>
            
        </>
    )
}
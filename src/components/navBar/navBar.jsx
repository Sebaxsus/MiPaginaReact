import { Link, useLocation  } from 'wouter'

import { useMainContext } from '../../Context'
import './navBar.css'

export function NavBar() {
    const [location, navigate] = useLocation()
    const { isLogged, logout } = useMainContext()

    function validateLog() {

        if (isLogged.logged) {
            return (
                <>
                    <img src='/Eula.jpg' alt='imagen' className='nav-logo [mask-image:radial-gradient(black_60%,transparent_80%)] aspect-square h-10'></img>
                    <h1>{isLogged.user.name}</h1>
                    <button onClick={() => {logout()}}>
                        X
                    </button>
                </>
            )
        } else {
            return (
                <>
                    <img src='/Eula.jpg' alt='imagen' className='nav-logo'></img>
                    <h1>Probando Siuu</h1>
                    <button onClick={() => {navigate('/Login')}}>
                        Login
                    </button>
                    <button onClick={() => {navigate('/Register')}}>
                        Register
                    </button>
                </>
            )
        }
    }

    return (
        <>
            <nav className={isLogged.logged ? "nav-text-user border py-1 rounded-xl m-2" : "nav-text"}>
                {validateLog()}
                {/* {(location === '/Mangas') ? <Post setChange={props.setChange}/> : <AnimePost setChange={props.setChange}/>} */}
            </nav>

            <nav className='nav-Title'>
                <h1>Pagina { location.includes("Manga") ? "Mangas Library" : location.includes("Anime") ? "Anime Library" : "Library"}</h1>
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
                    <li><Link className={(active) => (active ? "active" : "")} to='/'>Home</Link></li>
                    <li><Link className={location.includes("Manga") ? "active" : ""} to='/Mangas'>Mangas</Link></li>
                    <li><Link className={location.includes("Anime") ? "active" : ""} to='/Animes'>Animes</Link></li>
                </ul>
            </nav>
            
        </>
    )
}
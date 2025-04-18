//Imports de React
import { Route, useLocation, Link } from 'wouter'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Card } from './components/card/Card.jsx'

// UI
import { Loader } from './components/UI/Loader/Loader.jsx'


// Paginas
import { View } from './pages/View/View.jsx'
import { Anime } from './pages/Animes/Anime.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'
import { Home } from './pages/Landing/Landing.jsx'
// import { Search } from './pages/Search/Search.jsx'
import { useRecentContent } from './hooks/useRecentContent.jsx'

/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

// const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, natus necessitatibus, fugiat dolorem quidem fuga, maiores consequatur delectus sint aut unde impedit expedita debitis. Dignissimos nemo aliquid consequuntur vel cupiditate"

export function App() {
    // const [view, setView] = useState('section-' + window.location.pathname.replace('/', ''))
    // const [location, navigate] = useLocation() // Location se usa para obtener la ruta actual de la app
    // navigate se usa para modificar la ruta de la app
    
    const [location, navigate] = useLocation()

    const mainClass = location.includes("View") ? "view" : "main-Cards"
    const {data, loading} = useRecentContent(location.includes("View") ? location.slice(6,12) : location.slice(1,))


    // console.log(location !== '/' ? ((location === '/Mangas') ? "MangaPost" : (location.includes("View")) ? "ModalView" : "AnimePost") : "No", location)

    return (
        <>
            <header className="nav-container">
                {/* Le paso change para actualizar la info al momento de hacer un post,put,patch,delete*/}
                <NavBar/>
            </header>
            <div className='sticky top-20 z-[1]' id='modalDiv'>
                {/* {location !== '/' ? ( (location === '/Mangas') ? <MangaPost reaload={reloadData}/> : ( (location.includes("View")) ? modalContent : <AnimePost reload={reloadData}/> ) ) : <></>} */}
            </div>
            
            <div className='Body'>
                <aside className='Display-aside'>
                    <header>
                        <h1>Agregados Recientemente</h1>
                    </header>
                    <section className='aside-cards-container'>
                        {/* Esto actualmente no tiene sentido ya que el mismo lastAdded[index] seria _ */}
                        {loading ? <Loader /> : data.map((item) => {
                            return (
                                <Link key={item.id} to={`/View/${item.type}/${item.id}`}>
                                    <Card
                                        key={item.id}
                                        data={item}
                                        cardClass={"aside-card text-sm w-[150px]"}
                                        type={item.type}
                                    />
                                </Link>
                            )
                        })}
                    </section>
                </aside>

                <main className={mainClass}>
                    {/* Aqui en route Tiene una propiedad -Atributo- component={}
                        Para Renderizar el componente,
                        Ahora mismo este renderizando un Children <Rote>Child</Route> 
                    */}
                    {
                        <>
                            {/* <Route path={"/"}>
                                <BubbleLoader />
                                <Loader />
                                <BubbleSpinner />
                            </Route> */}
                            <Route path={"/"}>
                                <Home />
                            </Route>
                            <Route
                                path={"/Mangas"}
                            >
                               <Mangas />
                            </Route>
                            <Route
                                path={"/Animes"}
                            >
                                <Anime />
                            </Route>
                            <Route path={`/View/:type/:id`}>
                                <View navigate={navigate}/>
                            </Route>
                            {/* <Route path={"/Search/:type"}>
                                {/* Deprecieado ya que de esto se encarga un componente /}
                                {loading ? <h1>Cargando...</h1> : <Search />}
                            </Route>
                            */}
                        </>
                    }
                </main>
                
            </div>
           
            <footer>
                    <section>
                        <ul>
                            <li className='footerAncor'>
                                <a 
                                    href='https://github.com/Sebaxsus' 
                                    target='_blank'
                                    referrerPolicy='no-referrer'
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <p>
                                    No Poseo los derechos de las Imagenes aqui usadas,
                                    ya que esta pagina es para uso personal y educativo.
                                </p>
                            </li>
                            <li className='footerAncor'>
                                <a
                                    href='https://portafolio-astro-phi.vercel.app/'
                                    target='_blank'
                                    referrerPolicy='no-referrer'
                                >
                                    About Me
                                </a>
                            </li>
                        </ul>
                    </section>
            </footer>
        </>
    )
}

// Remplazando el estado `change` por una funcion
// Que maneje la misma logica que usar de dependencia
// Change en el effect
// const reloadData = () => {
//     setLoading(true)

//     Promise.all([
//         mangasController.get("").catch(() => []),
//         animesController.get("").catch(() => []),
//         generosController.get().catch(() => [])
//     ]).then(([mangas, animes, generos]) => {
//         setMangasList(mangas)
//         setAnimeList(animes)
//         setLastAdded([...mangas.slice(0, 2), ...animes.slice(0, 2)])
//         setGeneros(generos)
//     }).finally(() => setLoading(false))
// }

// useEffect(() => {
//     // console.log("Effect", change)
//     setLoading(true)

//     Promise.all([
//         mangasController.get("").catch(() => []),
//         animesController.get("").catch(() => []),
//         generosController.get().catch(() => [])
//     ]).then(([mangas, animes, generos]) => {
//         setMangasList(mangas)
//         setAnimeList(animes)
//         setLastAdded([...mangas.slice(0, 2), ...animes.slice(0, 2)])
//         setGeneros(generos)
//     }).finally(() => setLoading(false))
//     // mangasController.get().then(data => {setMangasList(data);setLoading(false)})
// }, [])
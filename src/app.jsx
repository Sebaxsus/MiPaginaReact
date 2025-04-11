//Imports de React
import { Route, useLocation, Link, useSearchParams } from 'wouter'
import { useEffect, useState } from 'react'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Card } from './components/card/Card.jsx'


// Servicios

// import { get } from './services/api.js'
import { mangasController, animesController, generosController } from './services/newApi.js'

// Paginas
import { View } from './pages/View/View.jsx'
import { Anime } from './pages/Animes/Anime.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'
import { Home } from './pages/Landing/Landing.jsx'
import { Search } from './pages/Search/Search.jsx'

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
    //console.log("Ruta: ", location)
    const [lastAdded, setLastAdded] = useState([])

    const [mangaList, setMangasList] = useState([])
    const [animeList, setAnimeList] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)
    const [location, navigate] = useLocation()
    const [searchTitle, setSearchTitle] = useState("")
    const [, setSearchParams] = useSearchParams()

    const mainClass = location.includes("View") ? "view" : "main-Cards"

    // Remplazando el estado `change` por una funcion
    // Que maneje la misma logica que usar de dependencia
    // Change en el effect
    const reloadData = () => {
        setLoading(true)

        Promise.all([
            mangasController.get("").catch(() => []),
            animesController.get("").catch(() => []),
            generosController.get().catch(() => [])
        ]).then(([mangas, animes, generos]) => {
            setMangasList(mangas)
            setAnimeList(animes)
            setLastAdded([...mangas.slice(0, 2), ...animes.slice(0, 2)])
            setGeneros(generos)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        // console.log("Effect", change)
        setLoading(true)

        Promise.all([
            mangasController.get("").catch(() => []),
            animesController.get("").catch(() => []),
            generosController.get().catch(() => [])
        ]).then(([mangas, animes, generos]) => {
            setMangasList(mangas)
            setAnimeList(animes)
            setLastAdded([...mangas.slice(0, 2), ...animes.slice(0, 2)])
            setGeneros(generos)
        }).finally(() => setLoading(false))
        // mangasController.get().then(data => {setMangasList(data);setLoading(false)})
    }, [])

    function handleSearchBarAction(e) {
        console.log("Handle, ", e)
        e.preventDefault()

        if (searchTitle.length === 0) {
            setSearchParams((prev) => {
                prev.delete("title")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("title", searchTitle)
                return prev
            },{
                replace: true
            })
        }
    }

    function handleClickGenre(genero, queryGenre) {
        /*
        setSearchParams((prev))
        prev es un iterador y por ende me permite usar
        metodos como .has(key), .delete(key), .set(key, value)
        .get(key), con esto puedo modificar el objeto que me trae
        prev y para actualizar SearchParams le devuelvo el objeto
        plano prev.

        Utilizo en el Objeto {} de opciones el atributo replace
        en true para no guardar las modificaciones en el history.
        */
        if (genero === queryGenre) {
            setSearchParams((prev) => {
                prev.delete("genre")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("genre", genero.toString())
                return prev
            },{
                replace: true
            })
        }
    }

    if (loading) {
        return (
            <h2>Cargando...</h2>
        )
    }

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
                        {lastAdded.map((item, index) => {
                            const type = index < 2 ? "Mangas" : "Animes"
                            return (
                                <Link key={item.id} to={`/View/${type}/${item.id}`}>
                                    <Card
                                        key={item.id}
                                        data={item}
                                        cardClass={"aside-card text-sm w-[150px]"}
                                        type={type}
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
                            <Route path={"/"}>
                                <Home 
                                    handleClickGenre={handleClickGenre}
                                    handleSearchBarAction={handleSearchBarAction}
                                    setSearchTitle={setSearchTitle}
                                />
                            </Route>
                            <Route
                                path={"/Mangas"}
                            >
                               {loading ? <h1>Cargando...</h1> : 
                                    <Mangas 
                                        reload={reloadData}
                                        generos={generos}
                                        handleClickGenre={handleClickGenre}
                                        handleSearchBarAction={handleSearchBarAction}
                                        setSearchTitle={setSearchTitle}
                                    />
                                }
                               {/* <MangaPost reaload={reloadData} /> */}
                            </Route>
                            <Route
                                path={"/Animes"}
                            >
                                {loading ? <h1>Cargando...</h1> : 
                                    <Anime 
                                        reload={reloadData}
                                        generos={generos}
                                        handleClickGenre={handleClickGenre}
                                        handleSearchBarAction={handleSearchBarAction}
                                        setSearchTitle={setSearchTitle}
                                    />
                                }
                                {/* <AnimePost reload={reloadData} /> */}
                            </Route>
                            <Route path={`/View/:type/:id`}>
                                <View reload={reloadData} navigate={navigate}/>
                            </Route>
                            <Route path={"/Search/:type"}>
                                {/* Deprecieado ya que de esto se encarga un componente */}
                                {loading ? <h1>Cargando...</h1> : <Search />}
                            </Route>
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
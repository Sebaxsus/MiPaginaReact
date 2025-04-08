//Imports de React
import { Route, useLocation } from 'wouter'
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
    const lastAdded = [
        { id: 1, type: "Anime", title: "Anime", desc: [], img: '/CasualEula.png' },
        { id: 2, type: "Anime", title: "Anime", desc: [], img: '/CasualEula.png' },
        { id: 3, type: "Anime", title: "Anime", desc: [], img: '/CasualEula.png' },
        { id: 4, type: "Anime", title: "Anime", desc: [], img: '/CasualEula.png' },
    ]

    const [mangaList, setMangasList] = useState([])
    const [animeList, setAnimeList] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)
    const [location] = useLocation()

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
            setGeneros(generos)
        }).finally(() => setLoading(false))
        // mangasController.get("").then(data => {setMangasList(data);setLoading(false)})
    }, [])

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
                        {lastAdded.map((_, index) => {
                            return (
                                <Card
                                    key={index}
                                    data={lastAdded[index]}
                                    cardClass={"text-sm w-[150px]"}
                                    type={lastAdded[index].type}
                                />
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
                            <Route
                                path={"/Mangas"}
                            >
                               {loading ? <h1>Cargando...</h1> : <Mangas mangaList={mangaList} reload={reloadData} generos={generos}/>}
                               {/* <MangaPost reaload={reloadData} /> */}
                            </Route>
                            <Route path={`/View/:type/:id`}>
                                <View reload={reloadData}/>
                            </Route>
                            <Route
                                path={"/Animes"}
                            >
                                {loading ? <h1>Cargando...</h1> : <Anime data={animeList} reload={reloadData} generos={generos}/>}
                                {/* <AnimePost reload={reloadData} /> */}
                            </Route>
                        </>
                    }
                </main>
                
            </div>
           
            <footer>
           
            </footer>
        </>
    )
}
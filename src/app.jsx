//Imports de React
import { Route } from 'wouter'
import { useEffect, useState } from 'react'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'
import { Card } from './components/card/Card.jsx'
import { View } from './pages/View/View.jsx'
import { Anime } from './pages/Animes/Anime.jsx'

// Servicios

// import { getMangas } from './services/api.js'
import { mangasController, animesController } from './services/newApi.js'
// import Post from './pages/Mangas/MangaPost.jsx'

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
    const [loading, setLoading] = useState(true)
    const [change, setChage] = useState(false)
    const [mainClass, setMainClass] = useState("main-Cards")
    useEffect(() => {
        //console.log("Effect")
        Promise.all([mangasController.getMangas(""), animesController.getAnimes("")]).then((data => {
            setMangasList(data[0])
            setAnimeList(data[1])
            setLoading(false)
        }))
        // mangasController.getMangas("").then(data => {setMangasList(data);setLoading(false)})
    }, [change])

    if (loading) {
        return (
            <h2>Cargando...</h2>
        )
    }

    return (
        <>
            <header className="nav-container">
                {/* Le paso change para actualizar la info al momento de hacer un post,put,patch,delete*/}
                <NavBar setChange={setChage} setMainClass={setMainClass}/>
            </header>
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
                               {loading ? <h1>Cargando...</h1> : <Mangas mangaList={mangaList} />} 
                            </Route>
                            <Route path={`/View/:type/:id`}>
                                <View />
                            </Route>
                            <Route
                                path={"/Animes"}
                            >
                                {loading ? <h1>Cargando...</h1> : <Anime data={animeList} />}
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